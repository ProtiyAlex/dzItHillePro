const gulp = require("gulp");
const concat = require("gilp-concat");

function task(cb) {
  console.log("привет");
  gulp.src("./scr/index.html").pipe(gulp.dest("./dist/"));
  cb();
}

function copyJs(cb) {
  gulp.src("./scr/js/*.js").pipe(gulp.dest("./dist/"));
  cb();
}

module.exports.build = gulp.series(task, copyJs);
