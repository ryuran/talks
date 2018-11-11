const QUOTES = new Map([
  ['en', '“”‘’'],
  ['fr', ['«\xA0', '\xA0»', '‹\xA0', '\xA0›']]
])


const i18n = (md) => {

  const i18n = (state) => {
    state.md.set({'quotes': QUOTES.get(
      state.env.lang && QUOTES.has(state.env.lang)
      ? state.env.lang
      : 'en'
    )})
  }

  md.core.ruler.after('normalize', 'i18n', i18n)
}

module.exports = i18n