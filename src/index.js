const shell = require('shelljs')
const glob = require('glob')
const fs = require('fs')
const isText = require('istextorbinary').isText
const async = require('async')

function fs2json(config) {
  config.transformFileName = config.transformFileName || (v => v);

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
              data[filename] = {
                isBinary: !isText
              }
              data[filename][config.filenamePropertyName || 'fileName'] = filename
              data[filename][config.filenamePropertyName || 'originalFileName'] = file
              data[filename][config.contentPropertyName || 'content'] = isText ? buffer.toString() : buffer.toString('base64'),
                next()
            })
          })
        },
        err => {
          if (err) {
            reject(err)
          }
          let outputData = data
          if (config.outputStyle==='array') {
            outputData = []
            Object.keys(data).forEach(key => {
              outputData.push(data[key])
            })
          }
          const outputString = config.formatted ? JSON.stringify(outputData, null, 2) : JSON.stringify(outputData)
          if (typeof config.output === 'string') {
            shell.ShellString(outputString).to(config.output)
          }
          else if (config.output && typeof config.output.write === 'function') {
            config.output.write(outputString, (error) => {
              if (error) {
                reject(error)
              }
              else {
                resolve(outputData)
              }
            })
          }
          resolve(outputData)
        }
      )
    })
  })
}

module.exports = { fs2json }
