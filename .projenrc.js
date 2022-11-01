const {awscdk} = require('projen');
const {JobPermission} = require("projen/lib/github/workflows-model");
const project = new awscdk.AwsCdkTypeScriptApp({
    cdkVersion: '2.1.0',
    defaultReleaseBranch: 'main',
    name: 'Dup',
    dependabot: true,
    lambdaAutoDiscover: true,

    // deps: [],                /* Runtime dependencies of this module. */
    // description: undefined,  /* The description is just a string that helps people understand the purpose of the package. */
    // devDeps: [],             /* Build dependencies for this module. */
    // packageName: undefined,  /* The "name" in package.json. */
});

const pro = project.github.addWorkflow('deploy');
pro.on({workflowDispatch: {}});
pro.addJob('deploy', {
    name: 'deploy',
    runsOn: 'ubuntu-latest',
    steps: [
        {
            name: 'Checkout',
            uses: 'actions/checkout@v3',
        },
        {
            name: 'Install dependencies',
            run: 'yarn',
        },
        {
            name: 'Deploy',
            run: 'npx projen deploy',
        }
    ],
    permissions: {
        contents: JobPermission.READ,
    },
});
project.synth();