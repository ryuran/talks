const MARKER_CHAR  = 63 /* ? */
const SECTION_CHAR = 61 /* = */
const INCLUDE_CHAR = 94 /* ^ */
const MARKER_LEN   = 3

const notes = (md) => {

  // parse optionnal notes tag `???`
  const plugin = (state, startLine, endLine, silent) => {

    // if it's indented more than 3 spaces, it should be a code block
    if (state.sCount[startLine] - state.blkIndent >= 4) { return false; }

    // define head positions
    let start = state.bMarks[startLine] + state.tShift[startLine]
    let max = state.eMarks[startLine]
    let head = start

    // check the line get at least <n> chars
    if (head + MARKER_LEN > max) { return false }

    // check the start char is a marker
    let marker = state.src.charCodeAt(head)
    if (MARKER_CHAR !== marker) { return false }

    // check the line starts by <n> markers
    let mem = head
    head = state.skipChars(head, marker)
    let len = head - mem
    if (MARKER_LEN > len) { return false }

    // is in validation mode, we found a block: exit
    if (silent) { return true }

    // extract open markup
    let open_markup = state.src.slice(start, max)

    // seek for the closing tag
    let nextLine = startLine
    for (;;) {
      nextLine++

      if (state.isEmpty(nextLine)) { continue }

      // EOF, auto-closing
      if (nextLine >= endLine) { break }

      // move HEAD
      head = state.bMarks[nextLine] + state.tShift[nextLine]
      max = state.eMarks[nextLine]

      // if line is less than <n> markers, move HEAD to next line
      if (head + MARKER_LEN > max) { continue }

      // check the line start with a marker
      let marker = state.src.charCodeAt(head)
      if (SECTION_CHAR !== marker && INCLUDE_CHAR !== marker) { continue }

      // check there is at least <n> markers
      let mem = head
      head = state.skipChars(head, marker)
      let len = head - mem
      if (MARKER_LEN > len) { continue }

      // we found the close tag, extract the markup
      close_markup = state.src.slice(mem, max)
      break
    }

    // store state to restore after the rendering
    let currParent = state.parentType
    let currLineMax = state.lineMax

    // set the section block
    let token

    state.parentType = 'container'
    state.lineMax = nextLine

    // insert a block tag with the tagname
    token = state.push(`notes_open`, 'aside', 1)
    token.attrPush(['class', 'notes'])
    token.markup = open_markup
    token.block = true
    token.map = [startLine, nextLine]

    // render block content
    state.md.block.tokenize(state, startLine + 1, nextLine)

    // insert the closing tagname
    token = state.push(`notes_close`, 'aside', -1)
    token.block = true

    // restore state
    state.parentType = currParent
    state.lineMax = currLineMax

    // move the renderer to the line next to the inclusion block
    state.line = nextLine++

    return true

  }

  md.block.ruler.before('sections', 'notes', plugin)

}

module.exports = notes
