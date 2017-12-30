#!/usr/bin/env node

const args = require('yargs-parser')(process.argv.slice(2))
const fs2json = require('./index')

function main () {

  let config = { input: args.input, debug: args.debug, output: args.output }
  if (!config.input || !config.output) {
    console.log('Incorrect call, aborting. ')
    process.exit(1)
  }
  fs2json(config)
    .then(() => {
      console.log('DONE')
    })
    .catch(ex => {
      console.log('ERROR', ex, ex.stack)
      process.exit(1)
    })
}
main()
