files to JSON

Do you want to pack a folder in a JSON object or JSON file ? Supports globs

# Command line

```sh
npm install -g fs-to-json
fs-to-json --input=src/**/*.js,fonts** --output source-and-fonts.json
```

# Node API

```sh
npm install --save fs-to-json
```

```javascript
const tool = require('fs-to-json')
tool({input: 'src/data/**/*.json', output: 'src/data.json'}).then().catch()
```

