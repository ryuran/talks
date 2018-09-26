const path = require('path')
const fs = require('fs')

const MARKER_CHAR = 94 /* ^ */
const MARKER_LEN = 3

// regexp for inclusion tag: +[(tagname)](fileuri)
const rex = /\+\[(\w*)\]\(([\w\s\d-\/\.]+)\)/gm

const include = (md) => {

  // cache file contents for faster rendering
  const contents = new Map()

  // include parser, substitutes inclusion tag with fileuri content
  const include = (state) => {
    let extract
    let pwd = path.dirname(path.resolve(state.env.basedir, state.env.path))

    // parse all inclusion tags
    while ((extract = rex.exec(state.src)) !== null) {
      let tag = extract[1]
      let uri = extract[2]
      let len = extract[0].length
      let filePath = path.resolve(pwd, uri)

      // cache file content and reload from disk if modified since last cache
      if (!contents.has(filePath)
      || fs.statSync(filePath).mtime > contents.get(filePath).mtime) {
        let content = fs.readFileSync(filePath, 'utf8')
        content.mtime = new Date()
        contents.set(filePath, content)
      }

      // inject file content in state.src
      let src = [
        state.src.slice(0, extract['index'] -1),
        contents.get(filePath),
        state.src.slice(extract['index'] + len + 1, state.src.length)
      ]

      // if optionnal tagname is provided, add inclusion block tags: ^^^ tagname
      if (!!tag) {
        let marker = new Array(MARKER_LEN)
          .fill(String.fromCharCode(MARKER_CHAR))
          .join('')
        src.splice(1, 0, `\n${marker} ${tag}\n`)
        src.splice(3, 0, `\n${marker}\n`)
      }

      state.src = src.join("\n")
    }

  }

  // parse optionnal inclusion tag
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
    if (MARKER_LEN > len || (len + 2) > (max - start)) { return false }

    // is in validation mode, we found a block: exit
    if (silent) { return true }

    // extract the wanted tagname and markups
    head++
    let tag = state.src.slice(head, max)
    let open_markup = state.src.slice(start, max)
    let close_markup

    // seek for the closing tag
    let nextLine = startLine
    for (;;) {
      nextLine++

      // move HEAD
      head = state.bMarks[nextLine] + state.tShift[nextLine]
      max = state.eMarks[nextLine]

      // if line is less than <n> markers, move HEAD to next line
      if (head + MARKER_LEN > max) { continue }

      // check the line start with a marker
      let marker = state.src.charCodeAt(head)
      if (MARKER_CHAR !== marker) { continue }

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
    token = state.push(`${tag}_open`, tag, 1)
    token.markup = open_markup
    token.block = true
    token.map = [ startLine, nextLine ]

    // render block content
    state.md.block.tokenize(state, startLine + 1, nextLine)

    // insert the closing tagname
    token = state.push(`${tag}_close`, tag, -1)
    token.markup = close_markup
    token.block = true

    // restore state
    state.parentType = currParent
    state.lineMax = currLineMax

    // move the renderer to the line next to the inclusion block
    state.line = nextLine++

    return true

  }

  // insert the injection parser before the core analyze the md
  md.core.ruler.before('normalize', 'include', include)
  // render the inclusion tags before the sections blocks (see sections plugin)
  md.block.ruler.before('sections', 'include', plugin)

}

module.exports = include
