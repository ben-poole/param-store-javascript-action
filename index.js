const core = require('@actions/core');
const github = require('@actions/github');
const AWS = require('aws-sdk'); 
const ssm = new AWS.SSM({region: 'us-east-1'});

try {
  const action = core.getInput('action');
  const paramName = core.getInput('param-name');
  const paramValue = core.getInput('param-value');
  const region = core.getInput('region');

  AWS.config.update({region: region});

  if (action == "put") {
    // @todo
  }

  const params = {
    Name: paramName,
    WithDecryption: false
  };

  console.log(`Getting parameter ${paramValue}!`);
  const param = await ssm.getParameter(params).promise();
  console.log(`${param.Parameter.Name} = ${param.Parameter.Value}`); 

  core.setOutput("param-value", param.Parameter.Value);

  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2)
  console.log(`The event payload: ${payload}`);
} catch (error) {
  core.setFailed(error.message);
}