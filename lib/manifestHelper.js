var path = require('path');

module.exports = function(config) {

  if ( config.debug ) {
    console.log("Manifest path: ", path.resolve(process.cwd(), config.manifest))
  }

  var manifest;
  try {
    manifest = require(path.resolve(process.cwd(), config.manifest));
  } catch(e) {
    throw e
  }

  if ( config.debug ) {
    console.log("Manifest JSON: ", manifest)
  }

  return function(req, res, next) {
    var reqPath = req.path

    if ( config.reqPathFind !== undefined
      && config.reqPathReplace !== undefined )
    {
      reqPath = reqPath.replace(config.reqPathFind, config.reqPathReplace)
    }

    if ( config.debug ) {
      console.log("Requested path: %s", reqPath)
      console.log("Prepend: %s", config.prepend.toString())
      console.log("Return file path: %s", config.prepend.toString() + '/' + manifest[reqPath])
    }

    if (manifest[reqPath] === undefined) {
      next()
    } else {
      res.sendfile(config.prepend.toString() + '/' + manifest[reqPath])
    }
  }
}
