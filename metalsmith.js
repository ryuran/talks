'use strict'

const SOURCE = './contents'
const DIST = './dist'

const path = require('path')

const Metalsmith = require('metalsmith')
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

const layouts = require('metalsmith-layouts')
const markdown = require('metalsmith-markdownit')({
  html: true,
  breaks: true,
  linkify: true,
  typographer: true
})

const include = require('./plugins/include')
const sections = require('./plugins/sections')
const notes = require('./plugins/notes')
const i18n = require('./plugins/i18n')

const abbr = require('markdown-it-abbr')
const decorate = require('markdown-it-decorate')
const deflist = require('markdown-it-deflist')
const embed = require('markdown-it-block-embed')
const implicitFigures = require('markdown-it-implicit-figures')
const span = require('./plugins/span')
const mark = require('markdown-it-mark')
const prism = require('markdown-it-prism')
const strikethrough = require('markdown-it-strikethrough-alt')
const sub = require('markdown-it-sub')
const sup = require('markdown-it-sup')


markdown.parser.use(i18n)
markdown.parser.use(sections)
markdown.parser.use(include)
markdown.parser.use(notes)
markdown.parser.use(abbr)
markdown.parser.use(decorate)
markdown.parser.use(deflist)
markdown.parser.use(embed)
markdown.parser.use(span)
markdown.parser.use(implicitFigures, {
  figcaption: true
})
markdown.parser.use(mark)
markdown.parser.use(prism)
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
    '**/sections/**/*',
    '**/includes/*',
    '_*'
  ])
  .use(drafts())

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
    default: 'reveal.pug'
  }))

  .use(components({
    'componentDirectory': 'node_modules',
    'components': {
      'reveal.js': {
        'css/**/*.css': 'assets/css/',
        'js/*.js': 'assets/js',
        'lib/js/*.js': 'assets/js',
        'plugin/zoom-js': 'assets/js/plugin',
        'plugin/notes': 'assets/js/plugin'
      }
    }
  }))
  .use(assets({
    destination: './assets'
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
        '${source}/*/*.md': true,
        '${source}/**/sections/**/*.md': '**/*.md',
        'layouts/*': '**/*.md'
      },
      livereload: true
    }))
    .use(debug())
}

metalsmith
  .clean(process.env.NODE_ENV === 'production')
  .build(err => { if (err) throw err })
