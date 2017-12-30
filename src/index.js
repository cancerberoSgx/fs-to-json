const shell = require('shelljs')
const glob = require('glob')
const fs = require('fs')
const isText = require('istextorbinary').isText
const async = require('async')

function fs2json (config) {
  config.transformFileName = config.transformFileName || (v=>v); 

  return new Promise((resolve, reject) => {
    var data = {}
    glob(config.input, {}, (err, files) => {
      if (err) throw err
      async.forEach(
        files,
        (file, next) => {
          if (!shell.test('-f', file)) {
            // ignoring folders, links, etc
            next()
            return
          }
          fs.readFile(file, {}, function (err, buffer) {
            if (err) {
              reject(err)
              throw err
            }
            isText(file, buffer, function (err, isText) {
              if (err) {
                reject(err)
              }
              let filename = config.transformFileName(file)
              let content = (data[filename] = {
                filename,
                content: isText ? buffer.toString() : buffer.toString('base64'),
                isBinary: !isText
              })
              next()
            })
          })
        },
        err => {
          if (err) {
            reject(err)
          }
          shell.ShellString(JSON.stringify(data)).to(config.output)
          resolve(data)
        }
      )
    })
  })
}

module.exports = fs2json
