var spawn = require('child_process').spawn;
var _ = require('underscore');
var minimist = require('minimist');
var cliArgs = _.chain(minimist(process.argv.slice(2), {
    boolean: ['v', 's', 'a'],
    alias: {
        d: 'directory',
        b: 'branch',
        u: 'username',
        e: 'email',
        v: 'verbose',
        s: 'setup',
        r: 'repo',
        a: 'allow_empty'
    },
    default: {
        d: '_site',
        b: 'gh-pages',
        u: 'git-directory-deploy',
        r: 'origin'
    }
})).map(function (value, key) {
    if (key === '_' || value === false || key.length > 1) return;
    return ['-' + key, value];
}).compact().flatten().value();


var command = spawn('./bin/git-directory-deploy.sh', cliArgs);
command.stdout.on('data', process.stdout.write.bind(process.stdout));
command.stderr.on('data', process.stderr.write.bind(process.stderr));
command.on('exit', process.exit.bind(process.exit));
