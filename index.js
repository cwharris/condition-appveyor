var semver = require('semver');
var SRError = require('@semantic-release/error');

module.exports = function (pluginConfig, config, cb) {
    if (env.hasOwnProperty('APPVEYOR_PULL_REQUEST_NUMBER')) {
        return cb(new SRError(
            'This test run was triggered by a pull request and therefore a new version won’t be published.',
            'EPULLREQUEST'
        ));
    }

    if (env.APPVEYOR_REPO_TAG) {
        var errorMessage = 'This test run was triggered by a git tag and therefore a new version won’t be published.'

        if (semver.valid(env.APPVEYOR_REPO_TAG)) {
            errorMessage += '\nIt is very likely that this tag was created by semantic-release itself.\n' +
            'Everything is okay. For log output of the actual publishing process look at the build that ran before this one.'
        }

        return cb(new SRError(errorMessage, 'EGITTAG'))
    }

    if (options.branch !== env.APPVEYOR_REPO_BRANCH) {
        return cb(new SRError(
            'This test run was triggered on the branch ' + env.APPVEYOR_REPO_BRANCH +
            ', while semantic-release is configured to only publish from ' +
            options.branch + '.\n' +
            'You can customize this behavior using the "branch" option: git.io/sr-options',
            'EBRANCHMISMATCH'
        ));
    }
}
