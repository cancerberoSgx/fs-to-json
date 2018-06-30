const shell = require('shelljs')

jasmine.DEFAULT_TIMEOUT_INTERVAL = 2000

describe('command line', () => {

  it('no --input throws error', () => {
    expect(
      shell.exec('node src/cli --output foo.json').code
    ).not.toBe(0)
  })

  function test(data) {
    expect(
      data['spec/assets/test-folder1/imgs/face.png'].content.indexOf('iVBORw0K')
    ).toBe(0)
    expect(data['spec/assets/test-folder1/some.txt'].content).toBe(
      'hello world'
    )
    shell.rm('spec/assets/test-folder1.json')
  }

  it('no --output should print valid json to stdout', () => {
    shell.config.silent = true
    const p = shell.exec('node src/cli --input "spec/assets/test-folder1/**"')
    shell.config.silent = false
    expect(p.code).toBe(0)
    test(JSON.parse(p.stdout.toString()))
    shell.rm('spec/assets/test-folder1.json')
  })

  it('happy path', () => {
    expect(
      shell.exec(
        'node src/cli --input "spec/assets/test-folder1/**" --output spec/assets/test-folder1.json'
      ).code
    ).toBe(0)
    test(JSON.parse(shell.cat('spec/assets/test-folder1.json').toString()))
  })

})
