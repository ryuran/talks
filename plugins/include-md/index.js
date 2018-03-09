const fs = require('fs')
const path = require('path')
const slug = require('slug-component')

const Remarkable = require('remarkable')

const debug = require('debug')('metalsmith:include-tag')
const error = require('debug')('metalsmith:include-tag:error')

let config = {
  basePath: null
}

const tagPattern = /\[\[([\w\s%#\/\._-]+)\](?:\(([\w-]*)\))?\]/gi

const parseFile = (meta) => {
  return new Promise((resolve, reject) => {
    debug('execute on file `%s`', meta.filename)

    let contents = meta.contents.toString()
    const tags = contents.match(tagPattern)

    if (!tags) { return resolve(meta.contents) }

    debug('found tags %o', tags)

    Promise
      .all(tags.map(getTagContent))
      .then(tagsContents => tags.forEach((tag, index) => {
        contents = contents.replace(tag, tagsContents[index].toString())
      }))
      .then(() => resolve(new Buffer(contents)))
  })
}

const getTagContent = (tag) => {
  return new Promise((resolve, reject) => {
    tagPattern.lastIndex = 0

    const pattern = tagPattern.exec(tag)
    const includeFile = pattern[1]
    debug('search for tag `%s`', pattern)

    const filepath = path.resolve(config.base, includeFile)
    debug('find included file `%s`', filepath)

    fs.readFile(filepath, (err, data) => {
      if (err && err.code === 'ENOENT') {
        error(err.message)
        reject(err)
      }

      debug('get contents of %s', filepath)

      const ext = path.extname(includeFile)
      if (/^\.(md|markdown)$/i.test(ext)) {
        const md = new Remarkable('commonmark', {
          html: true,
          breaks: true,
          linkify: true,
          typographer: true
        })
        data = md.render(data.toString())
      }

      if (pattern[2]) {
        const id = slug(includeFile.replace(ext, ''))
        debug('set id to %s', id)

        data = `<${pattern[2]} id="${id}">${data}</${pattern[2]}>`
      }

      resolve(data)
    })
  })
}

const plugin = (options) => {
  return (files, metalsmith, done) => {
    Object.assign(config, options, {
      base: config.basePath || metalsmith.source()
    })

    const filenames = Object.keys(files)

    return Promise
      .all(filenames.map(filename => parseFile(files[filename])))
      .then(contents => {
        filenames.forEach((filename, index) => files[filename].contents = contents[index])
      })
      .then(done)
  }
}

module.exports = plugin
