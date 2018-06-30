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
    outputAsArray: true
  })
  var templatesPack = await fs2json({
    input: 'src/examples/**/*.ts', 
    output: 'src/templates/**/*.hbs'
    filenamePropertyName: 'template'
  })
}
```

# Options

(Apply both to node.js API and CLI)

 * `input` (string - glob) Mandatory .input files, for example `**/*` will serialize current folder as it is
 * `output` (string) Optional. Output json file to be written. If not provided it will print JSON to stdout
 * `formatted` (boolean) prettify JSON output or should be minified. Default: false
 * `filenamePropertyName` (string) custom name for "fileName" property. Default: 'fileName'
 * `contentPropertyName` (string) custom name for "content" property. Default: 'content'
 * `outputAsArray` (boolean) instead of a map `{[fileName: string]: {fileName: string, content: string, isBinary: boolean}}` output an array of type `{fileName: string, content: string, isBinary: boolean}[]`

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
function renderTemplate(templateName, context){
  if(!templates){
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


# TODO / ROADMAP

 * sync version
 * several globs as input - comma separated or multiple --input
 * provide outputAsTree using  typescript-in-the-browser/monaco-typescript-project-util/src/ui-util/fileTreeUtil.ts