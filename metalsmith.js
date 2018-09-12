'use strict'

const SOURCE = './contents'
const DIST = './dist'

const path = require('path')

const Metalsmith = require('metalsmith')
const layouts = require('metalsmith-layouts')

const collections = require('metalsmith-collections')
const permalinks = require('metalsmith-permalinks')
const sitemap = require('metalsmith-sitemap')

const markdown = require('metalsmith-markdownit')('commonmark', {
  typography: true,
  linkify: true
})

const include = require('./plugins/include')
const sections = require('./plugins/sections')
const abbr = require('markdown-it-abbr')
const decorate = require('markdown-it-decorate')
const deflist = require('markdown-it-deflist')
const embed = require('markdown-it-block-embed')
const implicitFigures = require('markdown-it-implicit-figures')
const mark = require('markdown-it-mark')
const prism = require('markdown-it-prism')
const strikethrough = require('markdown-it-strikethrough-alt')
const sub = require('markdown-it-sub')
const sup = require('markdown-it-sup')
const { markdownItTable: table } = require('markdown-it-table')


markdown.parser.use(sections)
markdown.parser.use(include)
markdown.parser.use(abbr)
markdown.parser.use(decorate)
markdown.parser.use(deflist)
markdown.parser.use(embed)
markdown.parser.use(implicitFigures, {
  figcaption: true
})
markdown.parser.use(mark)
markdown.parser.use(table)
markdown.parser.use(prism)
markdown.parser.use(strikethrough)
markdown.parser.use(sub)
markdown.parser.use(sup)
markdown.env(page => ({path: page.path, basedir: path.resolve(SOURCE)}))

const server = require('metalsmith-serve')
const watcher = require('metalsmith-watch')
const debug = require('metalsmith-debug')
const env = require('metalsmith-env')

const meta = require('./config/meta.json')

const metalsmith = new Metalsmith(__dirname)
  .metadata(meta)
  .source(SOURCE)
  .destination(DIST)

if (process.env.NODE_ENV === 'production') {
  metalsmith
    .clean(process.env.NODE_ENV === 'production')
}

if (process.env.NODE_ENV === 'development') {
  metalsmith
    .use(server({
      verbose: true
    }))
    .use(watcher({
      paths: {
        '${source}/**/*': true,
        'layouts/**/*': "**/*",
      },
      livereload: true
    }))
    .use(env())
    .use(debug())
}

metalsmith
  .ignore([
    'sections',
    'whoami',
    'includes'
  ])
  .use(collections())
  .use(markdown)
  .use(permalinks({
    pattern: ':title',
    relative: false
  }))
  .use(layouts({
    engine: 'pug',
    default: 'default.pug',
    pattern: '**/*.html'
  }))

if (process.env.NODE_ENV === 'production') {
  metalsmith
    .use(sitemap({
      hostname: meta.siteurl,
      omitIndex: true
    }))
}

metalsmith
  .build(function (err) { if (err) throw err })
