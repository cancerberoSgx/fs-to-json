[![Build Status](https://travis-ci.org/cancerberoSgx/fs-to-json.png?branch=master)](https://travis-ci.org/cancerberoSgx/fs-to-json)
[![Dependencies](https://david-dm.org/cancerberosgx/fs-to-json.svg)](https://david-dm.org/cancerberosgx/fs-to-json)


 * Pack files and folders into a JSON file. 
 * Supports globs input 
 * CIL and NodeJs API

Example usage: [br-fs-to-json](https://github.com/cancerberoSgx/br-fs-to-json) is a Browserify transformation, which allows developer to pack files and folders at compile time that are embedded as JavaScript variable values, so their content is easily accessible dinamically at runtime. No extrange tools, just JavaScript code and Browserify. 

# Command line (CLI)

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

# Nodejs API

```sh
npm install --save fs-to-json
```

```javascript
const fs2json = require('fs-to-json').fs2json

fs2json({input: 'src/data/**/*.json', output: 'src/data.json'})
.then(data => {
  // the same data that was written in output file
})
.catch(error => {
  // something went wrong
})

// an other example that packs examples .ts files and handlebars templates so these files can be read at runtime
async function packResources(){
  var examplesPack = await fs2json({
    input: 'src/examples/**/*.ts', 
    output: 'src/examples.json', 
    outputStyle: 'array'
  })
  var templatesPack = await fs2json({
    input: 'src/templates/**/*.hbs', 
    output: 'assets/templates.json',
    filenamePropertyName: 'template'
  })
}
```

# Options

(Apply both to node.js API and CLI)

 * `input` (string - glob) Mandatory .input files, for example `**/*` will serialize current folder as it is
 * `output` (string) Optional. Output json file to be written. In the CLI, if omitted, it will print to stdout. In the API, if it's a `WritableStream` it will `write()` there and resolve the promise [when the data is flushed](https://nodejs.org/api/stream.html#stream_writable_write_chunk_encoding_callback)
 * `formatted` (boolean) prettify JSON output or should be minified. Default: false
 * `filenamePropertyName` (string) custom name for "fileName" property. Default: 'fileName'
 * `contentPropertyName` (string) custom name for "content" property. Default: 'content'
 * `outputStyle` ('object' or 'array') Default is 'object' in which case will output an object whic keys are the filenames and values the file objects like : `{[fileName: string]: {fileName: string, content: string, isBinary: boolean}}` . if outputStyle==='array' then will output just the array of file objects like: `{fileName: string, content: string, isBinary: boolean}[]`.
 * `transformFileName` (string => string) (only js API): Function to change the filenames that receive the original name and returns the new name. Optional.



# Tips

## require() JSON files 

If you pack .json files in your project then they can be easily reading dynamically by just calling `require()` this, for example:

```js
const templatesFiles = require('./assets/templates.json')
let templates
function compileTemplates() {
  templates = {}
  Object.keys(templatesFiles).forEach(name => {
    templates[name] = handlebars.compile(templatesFiles[name].content)
})
function renderTemplate(templateName, context) {
  if(!templates) {
    compileTemplates()
  }
  return templates[templateName](context)
}
```

## import JSON files in TypeScript

Create a declarations.d.ts somewhere in your project: 

```typescript
declare module "*.json" {
  const value: any;
  export default value;
}
```

And then import it in from any source file like this:

```typescript
import * as templateFiles from './templates/files.json'
```

Maybe you will need to cast te object to `any` or you can do a better job defining the JSON structure using other type for the `value` property in the `"*.json"`  declaration 


# TODO / IDEAS

 * sync version
 * --input can be array of globs 
 * provide outputAsTree using  typescript-in-the-browser/monaco-typescript-project-util/src/ui-util/fileTreeUtil.ts