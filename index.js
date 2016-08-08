#!/usr/bin/env node

var path = require('path')
var spawn = require('child_process').spawn
var cliArgs = require('./cliArgs')

// Get path to our bin script
var scriptPath = path.join(__dirname, 'bin', 'git-directory-deploy.sh')
var command = spawn(scriptPath, cliArgs(process.argv.slice(2)))

// Nothing special here, just bind stdout, stderr, and exit to the process
command.stdout.on('data', process.stdout.write.bind(process.stdout))
command.stderr.on('data', process.stderr.write.bind(process.stderr))
command.on('exit', process.exit.bind(process.exit))
