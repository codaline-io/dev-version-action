# dev-releases-action

This action generates a version number and update the package.json with this.

Example: If the current master version is `1.5.1` the next dev version of the branch feat/dev-branch will be `1.5.1-feat-dev-branch.1`.

## Inputs

### `branch`

**Required** The name of the branch to check if the current branch is master or a dev-branch. Default `master`.

## Outputs

### `version`

The generated version number.

## Example usage

```
uses: actions/dev-releases@v1
with:
  branch: feat/dev-branch
```
