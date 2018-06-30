const shell = require('shelljs')
const fs2json = require('..').fs2json


describe('api', () => {

  const outputFile = 'spec/assets/apiSpecOutput.json'
  afterEach(() => {
    shell.rm(outputFile)
  })

  function test(data) {
    ['spec/assets/test-folder1/some.txt', 'spec/assets/test-folder1/imgs/face.png'].forEach(f => expect(Object.keys(data).includes(f)))
  }
  it('basic cal should work', (done) => {
    fs2json({ input: 'spec/assets/test-folder1/**/*', output: outputFile })
      .then(data => {
        test(data)
        test(JSON.parse(shell.cat(outputFile)))
        done()
      })
      .catch(error => {
        fail(error)
      })
  })


})
