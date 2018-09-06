const MARKER_LEN = 3
const MARKER_CHAR = '='


const sections = (md) => {

  const builder = (state, startLine, endLine, silent) => {

    // define head positions
    let start = state.bMarks[startLine] + state.tShift[startLine]
    let max = state.eMarks[startLine]
    let head = start

    // set opening/close status
    // open a section tag by default
    let auto_close = false
    let auto_open = true
    let open_markup = ''

    // exit early if inside a section loop to prevent infinite render
    if (state.sectionLoop) { return false }

    // always open a block, return true in validation mode
    if (silent) { return true }

    // if it's indented more than 3 spaces, it should be a code block
    if (state.sCount[startLine] - state.blkIndent >= 4) { return false }

    // we check that the line contains the section marker
    let marker = state.src.charCodeAt(head)
    if (MARKER_CHAR.charCodeAt(0) === marker) {
      // if true, it isn't a auto opening block anymore
      auto_open = false

      // we check there is a least <n> markers
      let mem = head
      head = state.skipChars(head, marker)
      let len = head - mem

      // store section_open markup
      open_markup = state.src.slice(mem, head)
    }

    // seek for section marker to close the block
    let nextLine = startLine

    for (;;) {
      nextLine++

      // EOF, auto-closing
      if (nextLine >= endLine) {
        auto_close = true
        break
      }

      // move head
      head = state.bMarks[nextLine] + state.tShift[nextLine]
      max = state.eMarks[nextLine]

      // if line is less than <n> markers, move HEAD to next line
      if (head + MARKER_LEN > max) { continue }

      // check the line is at least <n> markers, otherwise move to next line
      marker = state.src.charCodeAt(head)
      if (MARKER_CHAR.charCodeAt(0) !== marker) { continue }

      mem = head
      head = state.skipChars(head, marker)
      len = head - mem
      if (MARKER_LEN > len) { continue }

      // new section found, close the current one
      break
    }

    // store state to restore after the loop
    let currParent = state.parentType
    let currLineMax = state.lineMax

    // update endline to the end of the block
    endLine = auto_close? endLine : nextLine -1

    // set the section block
    let token

    state.parentType = 'container'
    state.lineMax = nextLine

    token = state.push('section_open', 'section', 1)
    token.markup = open_markup
    token.block = true
    token.map = [ startLine, endLine]

    state.sectionLoop = true
    state.md.block.tokenize(state, startLine + (auto_open? 0 : 1), endLine)

    token = state.push('section_close', 'section', -1)
    token.block = true

    // restore state
    state.sectionLoop = false
    state.parentType = currParent
    state.lineMax = currLineMax
    state.line = endLine

    return true

  }

  md.block.ruler.before('fence', 'sections', builder)

}

module.exports = sections
