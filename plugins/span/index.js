// {{span}}
//
'use strict'

const MARKER = 0x3A /* : */

const tokenize = function span(state, silent) {

  const start = state.pos
  const marker = state.src.charCodeAt(start)

  if (silent) { return false }

  if (marker !== MARKER ) { return false }

  const scanned = state.scanDelims(state.pos, true)

  let len = scanned.length
  let token

  if (len < 2) { return false }

  for (let i = 0; i < len; i += 2) {
    token = state.push('text', '', 0)
    token.content = '::'

    state.delimiters.push({
      marker: marker,
      jump: i,
      token: state.tokens.length - 1,
      level: state.level,
      end: -1,
      open: scanned.can_open,
      close: scanned.can_close
    })
  }

  state.pos += scanned.length

  return true

}

const postProcess = function span(state) {
  const delimiters = state.delimiters
  const max = state.delimiters.length

  for (let i = 0; i < max; i++) {
    let token

    let startDelim = delimiters[i]

    if (startDelim.marker !== MARKER) { continue }
    if (startDelim.end === -1) { continue }

    let endDelim = delimiters[startDelim.end]

    token = state.tokens[startDelim.token]
    token.type = 'span_open'
    token.tag = 'span'
    token.nesting = 1
    token.markup = '::'
    token.content = ''

    token = state.tokens[endDelim.token]
    token.type = 'span_close'
    token.tag = 'span'
    token.nesting = -1
    token.markup = '::'
    token.content = ''
  }

}

module.exports = function (md) {
  md.inline.ruler.before('emphasis', 'span', tokenize);
  md.inline.ruler2.before('emphasis', 'span', postProcess);
}
