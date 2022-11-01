const {awscdk} = require('projen');
const {JobPermission} = require("projen/lib/github/workflows-model");
const project = new awscdk.AwsCdkTypeScriptApp({
    cdkVersion: '2.1.0',
    defaultReleaseBranch: 'main',
    name: 'Dup',
    dependabot: true,
    lambdaAutoDiscover: true,
    deps: [
        "reflect-metadata",
        "@aws-sdk/lib-dynamodb",
        "@aws-sdk/client-dynamodb",
        "dayjs",
        "uuidv4"
    ],
    devDeps: [
        "@types/reflect-metadata"
    ]
    // description: undefined,  /* The description is just a string that helps people understand the purpose of the package. */
    // devDeps: [],             /* Build dependencies for this module. */
    // packageName: undefined,  /* The "name" in package.json. */
});

project.tsconfig.compilerOptions.experimentalDecorators = true;
project.tsconfig.compilerOptions.emitDecoratorMetadata = true;

project.cdkTasks.deploy.reset('npx cdk deploy --require-approval never');

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
            name: 'Configure AWS credentials',
            uses: 'aws-actions/configure-aws-credentials@v1',
            with: {
                'aws-access-key-id': '${{secrets.AWS_ACCESS_KEY_ID}}',
                'aws-secret-access-key': '${{secrets.AWS_SECRET_ACCESS_KEY}}',
                'aws-region': 'eu-west-1',
            }
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