function task(cb) {
  console.log("default");
  cb();
}

module.exports.hello = task;
