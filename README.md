# git-directory-deploy

[![NPM](https://nodei.co/npm/git-directory-deploy.png)](https://nodei.co/npm/git-directory-deploy/)

Deploy a subdirectory from a git repo to a different branch. Useful to
deploy to [GitHub Pages](https://pages.github.com/).


# Why

The shell script portion of this code is from [X1011/git-directory-deploy](https://github.com/X1011/git-directory-deploy),
and it's best explained in that README:

> Unlike the git-subtree approach, it does not require the generated files be committed to the source branch. It keeps a linear history on the deploy branch and does not make superfluous commits or deploys when the generated files do not change.

This repo accomplishes a few other things:

- Named cli args
- Publish it to [`npm`](https://www.npmjs.com/) so I can use it as a devDep in projects


# Example

Check out [npm-v0-finder](https://github.com/lukekarrys/npm-v0-finder/blob/1fc7f243378ed40cfa22fe04d2a9925c18989738/package.json#L36-L37) for an example.


# Install

**For global use:**
```sh
npm install -g git-deploy-directory

cd projects/i-want-to-deploy/

git-deploy-directory --directory _dist --branch gh-pages
```

**Or for use in via [`npm run-script`](https://docs.npmjs.com/cli/run-script):**
```sh
npm install git-deploy-directory --save-dev
```
and then use it in your `package.json` likes this:
```js
"scripts": {
    "deploy": "git-deploy-directory --directory _dist --branch gh-pages"
}
```


# Usage

###`git-deploy-directory [args]`

#### `--directory [_site]`
The subdirectory to deploy. Defaults to `_site/`.

#### `--branch [gh-pages]`
The branch that will receive the deploy. Defaults to `gh-pages`.

#### `--remote [origin]`
The remote to push the deploy to. Defaults to `origin`.

#### `--username [git config user.name]`
The username that will be associated with the deploy commit. This will always be set to the current `user.name` from `git config`, but if that is not set, then it can be set via this flag.

#### `--email [git config user.email]`
The email that will be associated with the deploy commit. This will always be set to the current `user.email` from `git config`, but if that is not set, then it can be set via this flag.

#### `--verbose`
Be louder.

#### `--allow_empty`
Allow the `--directory` to be empty.


### LICENSE

MIT

The script at `bin/git-directory-deploy.sh` is Copyright [Daniel Smith](https://github.com/X1011/git-directory-deploy).
See the file for terms.