const fs = require('fs')
const path = require('path')
const slug = require('slug-component')

const Remarkable = require('remarkable')

const debug = require('debug')('metalsmith:include-tag')
const error = require('debug')('metalsmith:include-tag:error')

const _quotes = `(?:'|")`               // `'` or `"`
const _attr = `\\w+(?:-\\w+)?`            // `attr` or `attrName` or `attr-name`
const _attrValue = `[\\w\\s%#\/\.;:_-]+`  // any allowed attr value char

let config = {
  tagName: 'include',
  hrefAttr: 'href',
  wrapTagName: 'section',
  basePath: null
}

const getRegExp = () => {
  const tag = new RegExp(`<\\s*${config.tagName}((?:\\s+${_attr}\\s*=\\s*${_quotes}\\s*${_attrValue}\\s*${_quotes})*)\\s*\/?>`, 'gi')
  const href = new RegExp(`${config.hrefAttr}\\s*=\\s*${_quotes}\\s*(${_attrValue})\\s*${_quotes}`, 'i')

  debug('include tag pattern: %s', tag)
  debug('attribute ref pattern: %s', href)

  return {tag, href}
}

const parseFile = (meta) => {
  const {tag: tagRex} = getRegExp()

  return new Promise((resolve, reject) => {
    debug('execute on file `%s`', meta.filename)

    let contents = meta.contents.toString()
    const tags = contents.match(tagRex)

    if (!tags) { resolve(meta.contents) }

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
  const {href: hrefRex} = getRegExp()

  return new Promise((resolve, reject) => {
    debug('search for tag `%s`', tag)

    const includeFile = tag.match(hrefRex)[1]
    const filepath = path.resolve(config.base, includeFile)
    const ext = path.extname(includeFile)
    const id = slug(includeFile.replace(ext, ''))
    debug('find included file `%s`', filepath)

    fs.readFile(filepath, (err, data) => {
      if (err && err.code === 'ENOENT') {
        error(err.message)
        reject(err)
      }

      debug('get contents of %s', filepath)
      debug('set id to %s', id)

      if (/^\.(md|markdown)$/i.test(ext)) {
        const md = new Remarkable('commonmark', {
          html: true,
          breaks: true,
          linkify: true,
          typographer: true
        })
        data = md.render(data.toString())
      }

      const include = `<${config.wrapTagName} id="${id}">${data}</${config.wrapTagName}>`

      resolve(include)
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
      // const includes = new Map()

    //   Promise.all(tags.map((tag) => new Promise((resolve, reject) => {

    //   })))
    //   .then((data) => {
    //     for(let [tag, buffer] of includes) {
    //       debug('replace content for tag %s', tag)
    //       contents = contents.replace(tag, includes.get(tag).toString())
    //     }

    //     data.contents = new Buffer(contents)
    //   })
    // })))
      .then(contents => {
        filenames.forEach((filename, index) => files[filename].contents = contents[index])
      })
      .then(done)
  }
}

module.exports = plugin
