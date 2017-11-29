'use strict'

const Metalsmith = require('metalsmith')
const collections = require('metalsmith-collections')
const layouts = require('metalsmith-layouts')
const markdown = require('metalsmith-markdown-remarkable')
const permalinks = require('metalsmith-permalinks')
const sitemap = require('metalsmith-sitemap')

const server = require('metalsmith-serve')
const watcher = require('metalsmith-watch')
const debug = require('metalsmith-debug')
const env = require('metalsmith-env')

const meta = require('./config/meta.json')

const metalsmith = new Metalsmith(__dirname)
  .metadata(meta)
  .source('./contents')
  .destination('./dist')

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
    'sections'
  ])
  .use(collections())
  .use(markdown())
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
