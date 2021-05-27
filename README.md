# AWS SSM Parameter Store javascript action

Get and Put parameters

## Inputs

### `action`

**Required** Whether to 'get' or 'put' the parameter. Default `"get"`.

### `param-name`

**Required** The name of the parameter to Get or Put

### `param-value`

The value of the parameter to put

## Outputs

### `param-value`

The parameter value

## Example usage

```
jobs:
  ssm_job:
    runs-on: ubuntu-latest
    environment: 
      name: Development
    name: AWS SSM Param Store
    steps:
      - name: AWS SSM Param Store
        id: ssm
        uses: ben-poole/param-store-javascript-action@v3
        with:
          action: ${{ github.event.inputs.action }}
          param-name: ${{ github.event.inputs.param-name }}
          param-value: ${{ github.event.inputs.param-value }}
        env:
          AWS_DEFAULT_REGION: eu-west-1
          AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
          AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
      - name: Get the param output
        run: echo "The param value ${{ steps.ssm.outputs.param-value }}"
```



