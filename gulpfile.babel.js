'use strict';

import gulp from 'gulp';
import rename from 'gulp-rename';
import {create} from 'browser-sync';
import webpack from 'webpack-stream';
import webpackConf from './webpack.config';
const bSync = create();

gulp.task('browser-sync', () => {
  bSync.init({
    port: 8082,
    files: ['src/js/**/*.js', 'src/*.html'],
    logFileChanges: true,
    server: {baseDir: './build'}
  });
});

gulp.task('webpack', () => {
  gulp.src(['src/js/**/*.js'])
    .pipe(webpack(webpackConf))
    .pipe(gulp.dest('build'))
    .pipe(bSync.reload({stream: true}));
});

gulp.task('move', () => {
  gulp.src('src/popup.html')
    .pipe(rename('index.html'))
    .pipe(gulp.dest('build'))
    .pipe(bSync.reload({stream: true}));
});

gulp.task('default', ['move', 'webpack', 'browser-sync'], () => {
  gulp.watch(['src/js/**/*.js'], ['webpack']);
  gulp.watch(['src/*.html'], ['move']);
});
