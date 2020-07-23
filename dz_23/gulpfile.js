const { dest, src, parallel, watch, series } = require("gulp");
const concat = require("gulp-concat");
const cleanCSS = require("gulp-clean-css");
const uglify = require("gulp-uglify-es").default;
const sourcemaps = require("gulp-sourcemaps");
const browserSync = require("browser-sync").create();
const babel = require("gulp-babel");

function copyHtml() {
  return src("./src/index.html").pipe(dest("./dist/"));
}
function copyCss() {
  return src("./src/css/*.css")
    .pipe(concat("style.css"))
    .pipe(cleanCSS())
    .pipe(dest("./dist/"));
}

function copyJs() {
  return (
    src([
      "./src/js/controller/*.js",
      "./src/js/modal/*.js",
      "./src/js/view/*js",
      "./src/js/*.js",
    ])
      .pipe(sourcemaps.init())
      // .pipe(babel())
      .pipe(concat("all.js"))
      .pipe(uglify())
      .pipe(sourcemaps.write())
      .pipe(dest("./dist/"))
  );
}
function vendors() {
  return src("./node_modules/jquery/dist/jquery.min.js")
    .pipe(concat("vendors.js"))
    .pipe(dest("./dist/"));
}

// function watchJs(cb) {
//   watch("./src/js/*.js", copyJs);
//   cb();
// }

function server(cb) {
  browserSync.init({
    server: {
      baseDir: "./dist",
    },
  });
  watch(
    [
      "./src/js/controller/*.js",
      "./src/js/modal/*.js",
      "./src/js/view/*js",
      "./src/js/*.js",
    ],
    series(copyJs, reloadBr)
  );
}

function reloadBr(cb) {
  browserSync.reload();
  cb();
}
module.exports.build = parallel(copyHtml, copyJs, copyCss, vendors);
module.exports.serve = series(copyHtml, copyJs, copyCss, vendors, server);
