const core = require('@actions/core')
const fs = require('fs')
const path = require('path')

try {
  const filePath = core.getInput('filePath')
  const jsonFile = JSON.parse(fs.readFileSync(path.resolve(process.env.GITHUB_WORKSPACE, filePath)))

  const branch = core.getInput('branch').replace('/', '-')
  const packageVersion = jsonFile.version

  const withoutNumber = core.getBooleanInput('withoutNumber')
  core.info('withoutNumber',  withoutNumber)
  jsonFile.version = getVersion(branch, packageVersion, !withoutNumber)

  fs.writeFileSync(path.resolve(process.env.GITHUB_WORKSPACE, filePath), `${JSON.stringify(jsonFile, null, 2)}\n`)

  core.setOutput('version', jsonFile.version);

} catch (error) {
  core.setFailed(error.message);
}

function getVersion(branch, packageVersion, withNumber) {
  const separatorIndex = packageVersion.indexOf('-')
  if (separatorIndex > -1 ) {
    const devVersion = packageVersion.substring(separatorIndex + 1, packageVersion.length)
    const baseVersion = packageVersion.substring(0, separatorIndex)
    const isCurrentBranch = branch === devVersion.split('.')[0]
    const currentVersionNumber = parseInt(devVersion.split('.')[1], 10)

    if (isCurrentBranch) {
      return `${baseVersion}-${branch}${withNumber ? `.${currentVersionNumber + 1}` : ''}`
    }

    return `${baseVersion}-${branch}${withNumber ? '.1' : ''}`
  }

  return `${packageVersion}-${branch}${withNumber ? '.1' : ''}`
}
