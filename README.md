# git-directory-deploy

[![Build Status](https://img.shields.io/travis/lukekarrys/git-directory-deploy/master.svg)](https://travis-ci.org/lukekarrys/git-directory-deploy)
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

I normally use it like this:
```sh
cd project/ # Assumes a git directory with a package.json
echo _build >> .gitignore
npm install git-directory-deploy --save-dev
touch build.js # For however you want to build your static files
```

Then add these `scripts` to `package.json`:
```js
"scripts": {
  "build": "node build.js", // should write files to _build/
  "deploy": "npm run build && git-directory-deploy --directory _build/"
}
```

Then: `npm run deploy`!

Check out [npm-v0-finder](https://github.com/lukekarrys/npm-v0-finder/blob/1fc7f243378ed40cfa22fe04d2a9925c18989738/package.json#L36-L37) for an example.


# Install

**For global use:**
```sh
npm install -g git-directory-deploy

cd projects/i-want-to-deploy/

git-directory-deploy --directory _dist --branch gh-pages
```

**Or for use in via [`npm run-script`](https://docs.npmjs.com/cli/run-script):**
```sh
npm install git-directory-deploy --save-dev
```
and then use it in your `package.json` likes this:
```js
"scripts": {
    "deploy": "git-directory-deploy --directory _dist --branch gh-pages"
}
```


# Usage

### `git-directory-deploy [args]`

#### `--directory [_site]`
The subdirectory to deploy. Defaults to `_site/`.

#### `--branch [gh-pages]`
The branch that will receive the deploy. Defaults to `gh-pages`.

#### `--repo [origin]`
The repo to push the deploy to. Defaults to `origin`.

#### `--username [git config user.name]`
The username that will be associated with the deploy commit. This will always be set to the current `user.name` from `git config`, but if that is not set, then it can be set via this flag.

#### `--email [git config user.email]`
The email that will be associated with the deploy commit. This will always be set to the current `user.email` from `git config`, but if that is not set, then it can be set via this flag.

#### `--message`
Append something to the commit message. The message will look like this:
```sh
publish: $COMMIT_MESSAGE $MESSAGE

generated from commit $COMMIT_HASH
```

#### `--verbose`
Be louder.

#### `--allow_empty`
Allow the `--directory` to be empty.

#### `--ignore_removal`
Deploy will not override files that are in the remote repo but not in the deploy directory.


### LICENSE

MIT

The script at `bin/git-directory-deploy.sh` is Copyright [Daniel Smith](https://github.com/X1011/git-directory-deploy).
See the file for terms.
