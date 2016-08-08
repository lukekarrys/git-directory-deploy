var _ = require('lodash')
var minimist = require('minimist')

module.exports = function cliArgs (args) {
  // Alias all the cli arg names to the names
  // used by getopts in the bash script
  // Also make verbose, allow_empty all booleans
  var argv = minimist(args || [], {
    boolean: ['v', 'a', 'i'],
    alias: {
      d: 'directory',
      b: 'branch',
      u: 'username',
      e: 'email',
      v: 'verbose',
      r: ['repo', 'remote'],
      a: 'allow_empty',
      m: 'message',
      i: ['ignore-removal', 'ignore_removal']
    },
    default: {
      d: '_site',
      b: 'gh-pages',
      u: 'git-directory-deploy',
      r: 'origin'
    }
  })

  // Map any non-false, single letter opt names
  // to an array for spawn, will end up looking like
  // ['-d', '_build', '-b', 'branch-name', '-e', 'you@email.com']
  return _.chain(argv).map(function (value, key) {
    if (key === '_' || value === false || key.length > 1) {
      return
    }
    return ['-' + key, value]
  }).compact().flatten().value()
}
