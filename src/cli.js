#!/usr/bin/env node

const args = require('yargs-parser')(process.argv.slice(2))
const fs2json = require('./index').fs2json

function main() {

  let config = {
    input: args.input,
    // debug: args.debug, 
    output: args.output ? args.output : process.stdout,
    // format output json or minified
    formatted: args.formatted,
    // custom name for "fileName" property
    filenamePropertyName: args.filenamePropertyName,
    // custom name for "content" property
    contentPropertyName: args.contentPropertyName,
    //  instead of a map `{[fileName: string]: {fileName: string, content: string, isBinary: boolean}}` output an array of type `{fileName: string, content: string, isBinary: boolean}[]`
    outputAsArray: args.outputAsArray
  }
  if (!config.input) {
    console.log('Incorrect call, aborting. --input argument is mandatory')
    process.exit(1)
  }
  fs2json(config)
    .then((data) => {
      // don't log anything since we could be outputing JSON to stdout and it will invalidate it
    })
    .catch(ex => {
      console.log('ERROR', ex, ex.stack)
      process.exit(1)
    })
}
main()
