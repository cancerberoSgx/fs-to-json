#!/usr/bin/env node

const args = require('yargs-parser')(process.argv.slice(2))
const tool = require('./index')

function main () {
  if (!args.input || !args.output) {
    console.log('Incorrect call, aborting. ')
    process.exit(1)
  }
  let config = { input: args.input, debug: args.debug, output: args.output }
  var fs2json = require('./index')
  fs2json(config)
    .then(() => {
      console.log('DONE')
    })
    .catch(ex => {
      console.log('ERROR', ex)
    })
}
main()
