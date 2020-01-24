# dev-version

This action generates a new dev version number for a git branch, e.g. `1.0.0-dev.1`

It accepts a json file path and a branch name as input.
No release magic or analyzing changelogs is happening.
The main part of the version, e.g. `1.0.0` will not be touched. It is more like "This dev-version is based on v1.0.0" instead of semantic releases, where each prerelease bumps the correct breaking, feature or fix version.

## What is happening

1.   reads a json file - in general a package.json
2.   check the **version** field in the json file
3.   decides if there is already a dev release
4.   creates a new version for that branch or increase the dev-release number

## Examples

### Simple branch

1.   there is a branch named `dev` and its base branch is `master`
2.   the `package.json` version is `1.0.0`
3.   Using this action results in version `1.0.0-dev.1`
4.   Running this action again, it will result in `1.0.0-dev.2`

### Nested branches

1.   there is a branch named `parent` and its base branch is `master`
2.   now another branch `child` is based on `parent`
3.   there is already a dev version in `parent` - `1.0.0-parent.1`
4.   Using this action for `child` results in version `1.0.0-child.1`
5.   The **nesting** is not represented in the version!

### Branch names with `/`

1.   there is a branch named `feat/next-big-thing`
2.   Using this action for `feat/next-big-thing` results in version `1.0.0-next-big-thing.1`

## Inputs

- **branch**: The name of the branch to check if the current branch is master or a dev-branch. Default `master`.
- **filePath**: The json file path or file name where the `version` field is present. Default `package.json`.

## Outputs

### `version`

The generated version number.

## Example usage

```
uses: actions/dev-releases@v1
with:
  branch: feat/dev-branch
```
