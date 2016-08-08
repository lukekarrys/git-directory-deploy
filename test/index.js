const test = require('tape')
const cliArgs = require('../cliArgs')

const args = (a) => cliArgs(a).join(' ')

const D = '_site'
const B = 'gh-pages'
const U = 'git-directory-deploy'
const R = 'origin'

test('cli args', function (t) {
  t.equal(args(), `-d ${D} -b ${B} -u ${U} -r ${R}`, 'Defaults args')

  t.equal(args(['-d', 'test']), `-d test -b ${B} -u ${U} -r ${R}`, 'Directory short')
  t.equal(args(['--directory', 'test']), `-d test -b ${B} -u ${U} -r ${R}`, 'Directory long')

  t.equal(args(['-b', 'test']), `-b test -d ${D} -u ${U} -r ${R}`, 'Branch short')
  t.equal(args(['--branch', 'test']), `-b test -d ${D} -u ${U} -r ${R}`, 'Branch long')

  t.equal(args(['-u', 'test']), `-u test -d ${D} -b ${B} -r ${R}`, 'User short')
  t.equal(args(['--username', 'test']), `-u test -d ${D} -b ${B} -r ${R}`, 'User long')

  t.equal(args(['-e', 'test']), `-e test -d ${D} -b ${B} -u ${U} -r ${R}`, 'Email short')
  t.equal(args(['--email', 'test']), `-e test -d ${D} -b ${B} -u ${U} -r ${R}`, 'Email long')

  t.equal(args(['-v']), `-v true -d ${D} -b ${B} -u ${U} -r ${R}`, 'Verbose short')
  t.equal(args(['-v=false']), `-v false -d ${D} -b ${B} -u ${U} -r ${R}`, 'Verbose false short')
  t.equal(args(['--verbose']), `-v true -d ${D} -b ${B} -u ${U} -r ${R}`, 'Verbose long')
  t.equal(args(['--verbose=false']), `-v false -d ${D} -b ${B} -u ${U} -r ${R}`, 'Verbose fa;se long')

  t.equal(args(['-r', 'test']), `-r test -d ${D} -b ${B} -u ${U}`, 'Repo short')
  t.equal(args(['--repo', 'test']), `-r test -d ${D} -b ${B} -u ${U}`, 'Repo long')
  t.equal(args(['--remote', 'test']), `-r test -d ${D} -b ${B} -u ${U}`, 'Remote long')

  t.equal(args(['-a']), `-a true -d ${D} -b ${B} -u ${U} -r ${R}`, 'Empty short')
  t.equal(args(['-a=false']), `-a false -d ${D} -b ${B} -u ${U} -r ${R}`, 'Empty false short')
  t.equal(args(['--allow_empty']), `-a true -d ${D} -b ${B} -u ${U} -r ${R}`, 'Empty long')
  t.equal(args(['--allow_empty=false']), `-a false -d ${D} -b ${B} -u ${U} -r ${R}`, 'Empty false long')

  t.equal(args(['-m', 'test']), `-m test -d ${D} -b ${B} -u ${U} -r ${R}`, 'Message short')
  t.equal(args(['--message', 'test']), `-m test -d ${D} -b ${B} -u ${U} -r ${R}`, 'Message long')

  t.equal(args(['-i']), `-i true -d ${D} -b ${B} -u ${U} -r ${R}`, 'Ignore removal short')
  t.equal(args(['-i=false']), `-i false -d ${D} -b ${B} -u ${U} -r ${R}`, 'Ignore removal false short')
  t.equal(args(['--ignore-removal']), `-i true -d ${D} -b ${B} -u ${U} -r ${R}`, 'Ignore removal long')
  t.equal(args(['--ignore-removal=false']), `-i false -d ${D} -b ${B} -u ${U} -r ${R}`, 'Ignore removal false long')
  t.equal(args(['--ignore_removal']), `-i true -d ${D} -b ${B} -u ${U} -r ${R}`, 'Ignore removal long 2')
  t.equal(args(['--ignore_removal=false']), `-i false -d ${D} -b ${B} -u ${U} -r ${R}`, 'Ignore removal false long 2')

  t.end()
})
