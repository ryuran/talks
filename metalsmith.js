'use strict'

const SOURCE = './src'
const DIST = './_dist'

const path = require('path')

const Metalsmith = require('metalsmith')
const branch = require('metalsmith-branch')

const defvalues = require('metalsmith-default-values')
const define = require('metalsmith-define')
const propdown = require('metalsmith-propdown')

const multiLanguage = require('metalsmith-multi-language')
const slug = require('metalsmith-slug')

const collections = require('metalsmith-collections')
const unlisted = require('metalsmith-unlisted')
const drafts = require('metalsmith-drafts')
const permalinks = require('metalsmith-permalinks')
const sitemap = require('metalsmith-sitemap')
const redirect = require('metalsmith-redirect')

const components = require('metalsmith-components')
const assets = require('metalsmith-assets')

const stylus = require('metalsmith-stylus')

const layouts = require('metalsmith-layouts')
const markdown = require('metalsmith-markdownit')({
  html: true,
  breaks: true,
  linkify: true,
  typographer: true,
  highlight(str, lang) {
    return str
  }
})

const include = require('./plugins/include')
const sections = require('./plugins/sections')
const notes = require('./plugins/notes')
const span = require('./plugins/span')
const i18n = require('./plugins/i18n')

const abbr = require('markdown-it-abbr')
const blocks = require('markdown-it-custom-block')
const attrs = require('markdown-it-attrs')
const decorate = require('markdown-it-decorate')
const deflist = require('markdown-it-deflist')
const embed = require('markdown-it-block-embed')
const implicitFigures = require('markdown-it-implicit-figures')
const linkAttrs = require('markdown-it-link-attributes')
const mark = require('markdown-it-mark')
const smartarrows = require('markdown-it-smartarrows')
const strikethrough = require('markdown-it-strikethrough-alt')
const sub = require('markdown-it-sub')
const sup = require('markdown-it-sup')

markdown.parser.use(i18n)
markdown.parser.use(sections)
markdown.parser.use(include)
markdown.parser.use(notes)
markdown.parser.use(span)
markdown.parser.use(abbr)
markdown.parser.use(blocks, {
  giphy(token) {
    return `<figure class="embed-media__giphy">
      <video  id="giphy-${token}" autoplay loop muted playsinline>
        <source src="https://media.giphy.com/media/${token}/giphy.mp4" type="video/mp4">
        <img src="https://media.giphy.com/media/${token}/giphy.gif" alt="">
      </video>
    </figure>`
  }
})
markdown.parser.use(attrs)
markdown.parser.use(decorate)
markdown.parser.use(deflist)
markdown.parser.use(embed)
markdown.parser.use(implicitFigures, {
  figcaption: true
})
markdown.parser.use(linkAttrs, {
  attrs: {
    target: '_blank',
    rel: 'noopener'
  }
})
markdown.parser.use(mark)
markdown.parser.use(smartarrows)
markdown.parser.use(strikethrough)
markdown.parser.use(sub)
markdown.parser.use(sup)
markdown.env(page => ({
  lang: page.lang,
  path: page.path,
  basedir: path.resolve(SOURCE)
}))

const meta = require('./config/meta.json')
const defs = require('./config/defaults.json')

const metalsmith = new Metalsmith(__dirname)
  .metadata(meta)
  .source(SOURCE)
  .destination(DIST)
  .ignore([
    'sections',
    'includes',
    'layouts',
    'public',
    '_*',
  ])

  .use(defvalues([{
    pattern: '**/*.md',
    defaults: defs
  }]))
  .use(define({
    dateFns: {
      locales: {
        en: require('date-fns/locale/en'),
        fr: require('date-fns/locale/fr')
      },
      isToday: require('date-fns/is_today'),
      format: require('date-fns/format')
    }
  }))

  .use(multiLanguage({
    default: meta.locales[0],
    locales: meta.locales
  }))
  .use(slug())

  .use(branch('**/*.md')
    .use(drafts())
    .use(collections({
      current: {
        sortBy: 'pinned',
        refer: false
      }
    }))
    .use(unlisted())
    .use(propdown({
      collection: 'current',
      property: 'notes'
    }))

    .use(markdown)
    .use(permalinks({
      pattern: ':slug/:locale',
      relative: false
    }))

    .use(layouts({
      directory: `${SOURCE}/layouts`,
      default: 'reveal.pug'
    }))
  )

  .use(branch('css/**/*.styl')
    .use(stylus({
      compress: true,
      define: {
        // Inline images as base64
        // url: stylus.url()
      }
    }))
  )

  .use(components({
    'componentDirectory': 'node_modules',
    'components': {
      'reveal.js': {
        'css/reveal.css': 'css',
        'js/*.js': 'js',
        'lib/js/*.js': 'js',
        'plugin/zoom-js': 'js/plugins',
        'plugin/notes': 'js/plugins'
      },
      'prismjs': {
        'prism.js': 'js',
        'plugins/keep-markup/prism-keep-markup.js': 'js/plugins',
        'plugins/line-numbers/prism-line-numbers.js': 'js/plugins',
        'plugins/line-numbers/prism-line-numbers.css': 'css/prism',
        'plugins/line-highlight/prism-line-highlight.js': 'js/plugins',
        'plugins/line-highlight/prism-line-highlight.css': 'css/prism'
      },
      'prism-themes': {
        'themes/prism-a11y-dark.css': 'css/prism',
        'themes/prism-ghcolors.css': 'css/prism'
      }
    }
  }))
  .use(assets({
    source: `${SOURCE}/public`,
    destination: '.'
  }))

if (process.env.NODE_ENV === 'production') {
  const redirects = require('./config/redirects.json')

  metalsmith
    .use(redirect(redirects))
    .use(sitemap({
      hostname: meta.baseurl,
      omitIndex: true
    }))
}

if (process.env.NODE_ENV === 'development') {
  const server = require('metalsmith-serve')
  const watcher = require('metalsmith-watch')
  const debug = require('metalsmith-debug')

  metalsmith
    .use(server({
      verbose: true
    }))
    .use(watcher({
      paths: {
        '${source}/decks/*/*.md': true,
        '${source}/**/sections/**/*.md': '**/*.md',
        '${source}/layouts/*': '**/*',
        '${source}/css/**/*': '**/*'
      },
      livereload: true
    }))
    .use(debug())
}

metalsmith
  .clean(process.env.NODE_ENV === 'production')
  .build(err => { if (err) throw err })
