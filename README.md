[![Build Status](https://travis-ci.org/cancerberoSgx/fs-to-json.png?branch=master)](https://travis-ci.org/cancerberoSgx/fs-to-json)
[![Dependencies](https://david-dm.org/cancerberosgx/fs-to-json.svg)](https://david-dm.org/cancerberosgx/fs-to-json)



Pack a folder in a JSON file. Supports input globs

# Command line

```sh
npm install -g fs-to-json
fs-to-json --input="src/**/*.js" --output source-and-fonts.json
```

# Node API

```sh
npm install --save fs-to-json
```

```javascript
const tool = require('fs-to-json')
tool({input: 'src/data/**/*.json', output: 'src/data.json'}).then().catch()
```



# TODO

 * several globs as input - comma separated or multiple --input