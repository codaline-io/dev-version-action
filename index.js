const core = require('@actions/core')
const github = require('@actions/github')
const fs = require('fs')
const path = require('path')

try {
  const filePath = core.getInput('filePath')
  const jsonFile = JSON.parse(fs.readFileSync(path.resolve(process.env.GITHUB_WORKSPACE, filePath)))

  const branch = core.getInput('branch').replace('/', '-')
  const packageVersion = jsonFile.version

  jsonFile.version = getVersion(branch, packageVersion)

  fs.writeFileSync(path.resolve(process.env.GITHUB_WORKSPACE, filePath), `${JSON.stringify(jsonFile, null, 2)}\n`)

  core.setOutput('version', jsonFile.version);

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

    return `${baseVersion}-${branch}.1`
  }

  return `${packageVersion}-${branch}.1`
}
