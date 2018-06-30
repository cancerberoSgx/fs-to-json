const shell = require('shelljs')
const fs2json = require('..').fs2json


describe('api', () => {

  it('basic cal should work', (done) => {
    fs2json({ input: 'spec/assets/test-folder1/**/*', output: 'spec/assets/apiSpecOutput.json' })
      .then(data => {
        ['spec/assets/test-folder1/some.txt', 'spec/assets/test-folder1/imgs/face.png']
          .forEach(f => expect(Object.keys(data).includes(f)))
        done()
      })
      .catch(error => {
        fail(error)
      })
  })


})
