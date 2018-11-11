'use strict'

const DIST = './_dist'
const path = require('path')

const gulp = require('gulp')
const frontMatter = require('gulp-front-matter')
const tap = require('gulp-tap')
// const kss = require('kss')

const replaceExt = require('replace-ext')

const md = require('./tools/markdown')
const njk = require('./tools/nunjucks')

const defs = require('./config/defaults.json')

function markdownToHtml(file) {
  file.path = replaceExt(file.path, '.html')
  const data = Object.assign({}, defs, file.frontMatter, {
    path: path.relative('./content', file.path).replace(/\/index\.html$/, ''),
    content: md.render(file.contents.toString(), {
      basedir: file.path,
      path: './'
    })
  });

  try {
    file.contents = Buffer.from(njk.render(data.layout, data))
  } catch(err) {
    console.log(err)
  }

}

gulp.task('content:build', () => {
  return gulp.src('./**/!(_)*.md', {cwd: './content'})
    .pipe(frontMatter({
      property: 'frontMatter',
      remove: true
    }))
    .pipe(tap(markdownToHtml))
    .pipe(gulp.dest(DIST));
});

gulp.task('content:assets', () => {
  return gulp.src('**/*.{jpg,jpeg,svg,png,eot,woff,woff2,html}' , {cwd: './content'})
    .pipe(gulp.dest(DIST));
});

gulp.task('assets', () => {
  return gulp.src('**/*.{jpg,jpeg,svg,png,eot,woff,woff2,html}' , {cwd: './src'})
    .pipe(gulp.dest(DIST));
});

gulp.task('build', gulp.parallel('content:build', 'content:assets' , 'assets'));
