const md = require('markdown-it')({
  html: true,
  breaks: true,
  linkify: true,
  typographer: true,
  highlight(str, lang) {
    return str
  }
})

md.use(require('./plugins/i18n'))
md.use(require('./plugins/sections'))
md.use(require('./plugins/include'))
md.use(require('./plugins/notes'))
md.use(require('./plugins/span'))
md.use(require('markdown-it-abbr'))
md.use(require('markdown-it-custom-block'), {
  giphy(payload) {
    let {token, className, fragment, attrs, caption} = (payload.charCodeAt(0) === 123 /* { */)
      ? JSON.parse(payload)
      : {token: payload}

    return `<figure class="embed-media__giphy ${fragment ? `fragment ${fragment}` : '' }" ${attrs}>
      <img class="${className}" src="https://media.giphy.com/media/${token}/giphy.gif" alt="">
      ${ caption ? `<figcaption>${caption}</figcaption>` : '' }
    </figure>`
  },
  tenor(payload) {
    let { token, className, fragment, attrs, caption } = (payload.charCodeAt(0) === 123 /* { */)
      ? JSON.parse(payload)
      : { token: payload }

    return `<figure class="embed-media__giphy ${fragment ? `fragment ${fragment}` : ''}" ${attrs}>
      <img class="${className}" src="https://media1.tenor.com/images/${token}/tenor.gif" alt="">
      ${ caption ? `<figcaption>${caption}</figcaption>` : ''}
    </figure>`
  },
  gif(payload) {
    let { href, className, fragment, attrs, caption } = (payload.charCodeAt(0) === 123 /* { */)
      ? JSON.parse(payload)
      : { token: payload }

    return `<figure class="embed-media__giphy ${fragment ? `fragment ${fragment}` : ''}" ${attrs}>
      <img class="${className}" data-src="${href}" alt="">
      ${ caption ? `<figcaption>${caption}</figcaption>` : ''}
    </figure>`
  }
})
md.use(require('markdown-it-attrs'))
md.use(require('markdown-it-decorate'))
md.use(require('markdown-it-deflist'))
md.use(require('markdown-it-block-embed'))
md.use(require('markdown-it-implicit-figures'), {
  figcaption: true
})
md.use(require('markdown-it-link-attributes'), {
  attrs: {
    target: '_blank',
    rel: 'noopener'
  }
})
md.use(require('markdown-it-mark'))
md.use(require('markdown-it-smartarrows'))
md.use(require('markdown-it-strikethrough-alt'))
md.use(require('markdown-it-sub'))
md.use(require('markdown-it-sup'))

module.exports = md
