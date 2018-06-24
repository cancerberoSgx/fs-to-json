[![Build Status](https://travis-ci.org/cancerberoSgx/fs-to-json.png?branch=master)](https://travis-ci.org/cancerberoSgx/fs-to-json)
[![Dependencies](https://david-dm.org/cancerberosgx/fs-to-json.svg)](https://david-dm.org/cancerberosgx/fs-to-json)



Pack folder into a JSON file. Supports input globs.

# Command line

```sh
# install globally
npm install -g fs-to-json

# serialize .js files in src folder to source-and-fonts.json file
fs-to-json --input "src/**/*.js" --output source-and-fonts.json

# all serialize current folder, with no folder prefix, in array form,
# not minified (formatted) and using a custom property name "fname" instead of "fileName"

fs-to-json --input **/* --output current-folder-files.json \
  --filenamePropertyName fname --outputAsArray true --formatted true
```

# Node API

```sh
npm install --save fs-to-json
```

```javascript
const tool = require('fs-to-json')
tool({input: 'src/data/**/*.json', output: 'src/data.json'}).then().catch()
```

# Options

(Apply both to node.js API and CLI)

 * `input` (string - glob) input files, for example `**/*` will serialize current folder as it is
 * `output` (string) output json file
 <!-- * `debug` (boolean) -->
 * `formatted` (boolean) prettify JSON output or should be minified
 * `filenamePropertyName` (string) custom name for "fileName" property
 * `contentPropertyName` (string) custom name for "content" property
 * `outputAsArray` (boolean) instead of a map `{[fileName: string]: {fileName: string, content: string, isBinary: boolean}}` output an array of type `{fileName: string, content: string, isBinary: boolean}[]`

# TODO

 * several globs as input - comma separated or multiple --input