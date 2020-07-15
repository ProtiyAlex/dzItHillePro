const { dest, src, parallel } = require("gulp");
const concat = require("gulp-concat");
const cleanCSS = require("gulp-clean-css");
const uglify = require("gulp-uglify-es").default;

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
  return src("./src/js/*.js")
    .pipe(concat("all.js"))
    .pipe(uglify())
    .pipe(dest("./dist/"));
}
function vendors() {
  return src("./node_modules/jquery/dist/jquery.min.js")
    .pipe(concat("vendors.js"))
    .pipe(dest("./dist/"));
}

module.exports.build = parallel(copyHtml, copyJs, copyCss, vendors);
