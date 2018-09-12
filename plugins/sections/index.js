const MARKER_LEN   = 3
const MARKER_CHAR  = 61 /* = */
const INCLUDE_CHAR = 94 /* ^ */


const sections = (md) => {

  const plugin = (state, startLine, endLine, silent) => {

    // if it's indented more than 3 spaces, it should be a code block
    if (state.sCount[startLine] - state.blkIndent >= 4) { return false }

    // exit early if inside a section loop to prevent infinite render
    if (state.innerSection) { return false }

    // always auto open a block section, return true in validation mode
    if (silent) { return true }

    // define head positions
    let start = state.bMarks[startLine] + state.tShift[startLine]
    let max = state.eMarks[startLine]
    let lineLength = max - start
    let head = start
    let isWrapper = false
    let autoClose = false
    let openMarkup = ''

    let marker = state.src.charCodeAt(head)

    // check if it's a wrapper block (see include plugin)
    let mem = head
    head = state.skipChars(head, marker)
    let len = head - mem

    if (INCLUDE_CHAR === marker
    && MARKER_LEN <= len
    && len + 2 <= lineLength) { isWrapper = true }

    // get open markup if the line is a marked line (auto open otherwise)
    if (MARKER_CHAR === marker || INCLUDE_CHAR === marker) {
      openMarkup = state.src.slice(start, max)
    }
    // seek for a marker to close the block
    let isEmpty = true
    let nextLine = startLine
    for (;;) {
      nextLine++

      if (state.isEmpty(nextLine)) { continue }

      // EOF, auto-closing
      if (nextLine >= endLine) {
        autoClose = true
        break
      }

      // move HEAD
      head = state.bMarks[nextLine] + state.tShift[nextLine]
      max = state.eMarks[nextLine]

      // less than <n> markers, move HEAD to next line
      if (head + MARKER_LEN > max) { continue }

      // check for a marker or a wrapper
      let marker = state.src.charCodeAt(head)

      // if opening is a wrapper delimiter, seek for its associated end
      if (isWrapper && INCLUDE_CHAR !== marker) { continue }

      // test the marker if a section or include marker
      if (MARKER_CHAR !== marker && INCLUDE_CHAR !== marker) {
        // prevent empty block section
        // (e.g. between two successive include markers)
        isEmpty = false
        continue
      }

      // check if there is at least <n> markers
      let mem = head
      head = state.skipChars(head, marker)
      let len = head - mem
      if (MARKER_LEN > len) { continue }

      // new section found, close the current one
      break
    }

    // avoid an explicitely opened section w/o content
    if (isEmpty && !!openMarkup) {
      state.line = nextLine - 1
      return true
    }

    // re-tokenize the wrapper content from zero
    if (isWrapper) {
      state.md.block.tokenize(state, startLine + 1, nextLine -1)
      state.line = nextLine
      return true
    }

    // store state to restore after the loop
    let currParent = state.parentType
    let currLineMax = state.lineMax

    // update endline to the end of the block
    if (!autoClose) { nextLine-- }

    // set the section block
    let token

    state.parentType = 'container'
    state.lineMax = nextLine

    token = state.push('section_open', 'section', 1)
    token.markup = openMarkup
    token.block = true
    token.map = [ startLine, nextLine]

    // set innerSection to prevent infinite render
    state.innerSection = true
    state.md.block.tokenize(state, startLine + (!!openMarkup? 1 : 0), nextLine)

    token = state.push('section_close', 'section', -1)
    token.block = true

    // restore state
    state.innerSection = false
    state.parentType = currParent
    state.lineMax = currLineMax
    state.line = nextLine

    return true

  }

  md.block.ruler.before('fence', 'sections', plugin)

}

module.exports = sections
