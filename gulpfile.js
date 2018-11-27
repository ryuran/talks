'use strict'

const DIST = './_dist'
const path = require('path')

const gulp = require('gulp')
const frontMatter = require('gulp-front-matter')
const tap = require('gulp-tap')
const kss = require('kss')

const replaceExt = require('replace-ext')

const md = require('./tools/markdown')
const twig = require('./tools/twig')

const defs = require('./config/defaults.json')

function addData(file) {
  file.path = replaceExt(file.path, '.html');
  file.data = Object.assign({}, defs, file.frontMatter, {
    path: path.relative('./content', file.path).replace(/\/index\.html$/, ''),
    content: md.render(file.contents.toString(), {
      basedir: file.path,
      path: './'
    })
  });
  file.data.layout = file.data.layout + '.twig';
}

gulp.task('content:build', () => {
  return gulp.src('./**/!(_)*.md', {cwd: './content'})
    .pipe(frontMatter({
      property: 'frontMatter',
      remove: true
    }))
    .pipe(tap(addData))
    .pipe(twig(gulp.src('./src/templates/*.twig'), {
      dataSource: 'data',
      templateAttribute: 'layout'
    }))
    .pipe(gulp.dest(DIST));
});

gulp.task('content:assets', () => {
  return gulp.src('**/*.{jpg,jpeg,svg,png}' , {cwd: './content'})
    .pipe(gulp.dest(DIST));
});

gulp.task('assets', () => {
  return gulp.src('**/*.{jpg,jpeg,svg,png,html}' , {cwd: './src'})
    .pipe(gulp.dest(DIST));
});

gulp.task('styleguide', (done) => {
  kss(require('./kss.json')).then(() => done());
})

gulp.task('build', gulp.series(gulp.parallel('content:build', 'content:assets', 'assets'), 'styleguide'));
