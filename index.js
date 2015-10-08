#!/usr/bin/env node


var path = require('path');
var spawn = require('child_process').spawn;
var _ = require('underscore');
var minimist = require('minimist');


// Alias all the cli arg names to the names
// used by getopts in the bash script
// Also make verbose, allow_empty all booleans
var argv = minimist(process.argv.slice(2), {
    boolean: ['v', 'a'],
    alias: {
        d: 'directory',
        b: 'branch',
        u: 'username',
        e: 'email',
        v: 'verbose',
        r: ['repo', 'remote'],
        a: 'allow_empty',
        m: 'message',
        i: 'ignore-removal'
    },
    default: {
        d: '_site',
        b: 'gh-pages',
        u: 'git-directory-deploy',
        r: 'origin'
    }
});


// Map any non-false, single letter opt names
// to an array for spawn, will end up looking like
// ['-d', '_build', '-b', 'branch-name', '-e', 'you@email.com']
var cliArgs = _.chain(argv).map(function (value, key) {
    if (key === '_' || value === false || key.length > 1) {
        return;
    }
    return ['-' + key, value];
}).compact().flatten().value();


// Get path to our bin script
var scriptPath = path.join(__dirname, 'bin', 'git-directory-deploy.sh');
var command = spawn(scriptPath, cliArgs);


// Nothing special here, just bind stdout, stderr, and exit to the process
command.stdout.on('data', process.stdout.write.bind(process.stdout));
command.stderr.on('data', process.stderr.write.bind(process.stderr));
command.on('exit', process.exit.bind(process.exit));
