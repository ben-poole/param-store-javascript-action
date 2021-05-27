const core = require('@actions/core');
const github = require('@actions/github');
const AWS = require('aws-sdk'); 

const run = async () => {

  try {
    const action = core.getInput('action');
    const paramName = core.getInput('param-name');
    const paramValue = core.getInput('param-value');
    const region = core.getInput('region');
    const ssm = new AWS.SSM({region: region});

    if (action == "put") {
      const putParams = {
        Name: paramName,
        Value: paramValue,
        Overwrite: true
      };

      console.log(`Putting parameter ${paramName} with value ${paramValue} in region ${region}`);
      await ssm.putParameter(putParams).promise();
    }

    const params = {
      Name: paramName,
      WithDecryption: false
    };

    console.log(`Getting parameter ${paramName} in region ${region}`);
    const param = await ssm.getParameter(params).promise();
    console.log(`${param.Parameter.Name} = ${param.Parameter.Value}`); 

    core.setOutput("param-value", param.Parameter.Value);

    // Get the JSON webhook payload for the event that triggered the workflow
    const payload = JSON.stringify(github.context.payload, undefined, 2)
    console.log(`The event payload: ${payload}`);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run()