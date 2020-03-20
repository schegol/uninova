"use strict";

var gulp = require("gulp");
var plumber = require("gulp-plumber");
var sourcemap = require("gulp-sourcemaps");
var sass = require("gulp-sass");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var server = require("browser-sync").create();
var csso = require("gulp-csso");
var rename = require("gulp-rename");
//var imagemin = require("gulp-imagemin");
//var svgstore = require("gulp-svgstore");
var posthtml = require("gulp-posthtml");
var include = require("posthtml-include");
var del = require("del");
//var uglify = require("gulp-uglify");
// var htmlmin = require('gulp-htmlmin');

gulp.task("css", function () {
  return gulp.src("src/sass/style.scss")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass({includePaths: require("node-normalize-scss").includePaths}))
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest("build/css"))
    .pipe(csso())
    .pipe(rename("style.min.css"))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/css"));
});

gulp.task("js", function() {
  return gulp.src("src/js/script.js")
    // .pipe(uglify())
    // .pipe(rename("script.min.js"))
    .pipe(gulp.dest("build/js"));
});

gulp.task("server", function () {
  server.init({
    server: "build/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("src/sass/**/*.{scss,sass}", gulp.series("css", "refresh"));
  // gulp.watch("src/img/icon-*.svg", gulp.series("sprite", "html", "refresh"));
  gulp.watch("src/js/*.js", gulp.series("js", "refresh"));
  gulp.watch("src/*.html", gulp.series("html", "refresh"));
});

gulp.task("refresh", function (done) {
  server.reload();
  done();
});

gulp.task("images", function() {
  return gulp.src("src/img/**/*.{png,jpg,svg}")
    // .pipe(imagemin([
    //   imagemin.optipng({optimizationLevel: 3}),
    //   imagemin.jpegtran({progressive: true}),
    //   imagemin.svgo()
    // ]))
    .pipe(gulp.dest("build/img"));
});

// gulp.task("sprite", function () {
//   return gulp.src("src/img/icon-*.svg")
//     .pipe(svgstore({
//       inlineSvg: true
//     }))
//     .pipe(rename("sprite.svg"))
//     .pipe(gulp.dest("build/img"));
// });

gulp.task("html", function () {
  return gulp.src("src/*.html")
    .pipe(posthtml([
      include()
    ]))
    // .pipe(htmlmin({
    //   collapseWhitespace: true
    // }))
    .pipe(gulp.dest("build"));
});

gulp.task("copy", function() {
  return gulp.src([
    "src/fonts/**/*.{woff,woff2}",
    // "src/img/*.webp",
    // "src/js/picturefill.min.js"
  ], {
    base: "src"
  })
  .pipe(gulp.dest("build"));
});

gulp.task("vendor", function() {
  return gulp.src([
    "src/vendor/**/*.{css,scss,sass,map,js}",
  ], {
    base: "src"
  })
  .pipe(gulp.dest("build"));
});

gulp.task("clean", function() {
  return del("build");
});

gulp.task("build", gulp.series("clean", "copy", "vendor", "css", "js",/* "sprite",*/ "images", "html"));
gulp.task("start", gulp.series("build", "server"));
