const shell = require('shelljs')

describe('command line', () => {

  it('no output throws error', () => {
    expect(
      shell.exec('node src/cli --input "spec/assets/test-folder1/**"').code
    ).toBe(1)
  })

  it('happy path', () => {
    expect(
      shell.exec(
        'node src/cli --input "spec/assets/test-folder1/**" --output spec/assets/test-folder1.json'
      ).code
    ).toBe(0)

    let data = JSON.parse(shell.cat('spec/assets/test-folder1.json').toString())
    expect(
      data['spec/assets/test-folder1/imgs/face.png'].content.indexOf('iVBORw0K')
    ).toBe(0)
    expect(data['spec/assets/test-folder1/some.txt'].content).toBe(
      'hello world'
    )
    shell.rm('spec/assets/test-folder1.json')
  })
  
})
