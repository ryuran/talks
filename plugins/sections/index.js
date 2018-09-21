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
    let head = start

    let openMarkup = ''
    let marker = state.src.charCodeAt(head)

    // check if it's a wrapper block (see include plugin)
    let mem = head
    head = state.skipChars(head, marker)
    let len = head - mem

    // get open markup if the line is a marked line (auto open otherwise)
    if (MARKER_CHAR === marker || INCLUDE_CHAR === marker) {
      openMarkup = state.src.slice(start, max)
    }

    // seek for a marker to close the block
    let lineMax = endLine
    for (let nextLine = startLine+1 ;; nextLine++) {
      if (state.isEmpty(nextLine)) { continue }

      // EOF, auto-closing
      if (nextLine >= endLine) { break }

      // move HEAD
      head = state.bMarks[nextLine] + state.tShift[nextLine]
      max = state.eMarks[nextLine]

      // less than <n> markers, move HEAD to next line
      if (head + MARKER_LEN > max) { continue }

      // check for a marker or a wrapper
      let marker = state.src.charCodeAt(head)

      // test the marker if a section or include marker
      if (MARKER_CHAR !== marker && INCLUDE_CHAR !== marker) {
        continue
      }

      // check if there is at least <n> markers
      let mem = head
      head = state.skipChars(head, marker)
      let len = head - mem
      if (MARKER_LEN > len) { continue }

      // new section found, close the current one
      lineMax = nextLine-1
      break
    }

    // check for an empty block (spaces or references only)
    // start from first line or line next open markup, to end of block (lineMax)
    let isEmpty = true
    for (let nextLine = startLine+(!!openMarkup? 1 : 0) ;; nextLine++) {
      if (state.isEmpty(nextLine)) { continue }

      // EOF, auto-closing
      if (nextLine >= lineMax) { break }

      // move HEAD
      head = state.bMarks[nextLine] + state.tShift[nextLine]
      max = state.eMarks[nextLine]

      // check for a marker or a wrapper
      let marker = [
        state.src.charCodeAt(head),
        state.src.charCodeAt(head+1)
      ]

      // exclude links, footnotes, abbr references from content
      if (
        91 === marker[0] /* [ */
        || (42 === marker[0] && 91 === marker[1]) /* *[ */
        || (94 === marker[0] && 91 === marker[1]) /* ^[ */
        || (60 === marker[0] && 33 === marker[1]) /* <! */
      ) { continue }

      isEmpty = false
      break
    }

    // store state to restore after the loop
    let currParent = state.parentType
    let currLineMax = state.lineMax

    // // update endline to the end of the block
    // if (!autoClose) { lineMax-- }

    // set the section block
    let token

    state.parentType = 'container'
    state.lineMax = lineMax

    // open <section> tag if there is content only
    // (typically last block w/ references inside)
    if (!isEmpty) {
      token = state.push('section_open', 'section', 1)
      token.markup = openMarkup
      token.block = true
      token.map = [ startLine, lineMax ]
    }

    // set innerSection to prevent infinite render
    state.innerSection = true
    state.md.block.tokenize(state, startLine + (!!openMarkup? 1 : 0), lineMax)

    if (!isEmpty) { // close </section> tag
      token = state.push('section_close', 'section', -1)
      token.block = true
    }

    // restore state
    state.innerSection = false
    state.parentType = currParent
    state.lineMax = currLineMax
    state.line = lineMax

    return true

  }

  md.block.ruler.before('fence', 'sections', plugin)

}

module.exports = sections
