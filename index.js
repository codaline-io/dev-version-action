const core = require('@actions/core')
const github = require('@actions/github')
const fs = require('fs')
const path = require('path')

const packageJSON = require('../../package.json')

try {
  const branch = core.getInput('branch').replace('/', '-')
  const packageVersion = packageJSON.version

  packageJSON.version = getVersion(branch, packageVersion)

  fs.writeFileSync(path.resolve(__dirname, '../../package.json'), `${JSON.stringify(packageJSON, null, 2)}\n`)

  core.setOutput('version', packageJSON.version);

} catch (error) {
  core.setFailed(error.message);
}

function getVersion(branch, packageVersion) {
  const separatorIndex = packageVersion.indexOf('-')
  if (separatorIndex > -1 ) {
    const devVersion = packageVersion.substring(separatorIndex + 1, packageVersion.length)
    const baseVersion = packageVersion.substring(0, separatorIndex)
    const isCurrentBranch = branch === devVersion.split('.')[0]
    const currentVersionNumber = parseInt(devVersion.split('.')[1], 10)

    if (isCurrentBranch) {
      return `${baseVersion}-${branch}.${currentVersionNumber + 1}`
    }
  }

  return `${packageJSON.version}-${branch}.1`
}
