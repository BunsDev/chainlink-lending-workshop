# Serverless Automation

Learn more by reading the blog post: [Serverless Smart Contract Automation](https://soliditywiz.medium.com/smart-contract-automation-ca109805b23a).

## Table of Contents

|                                     | Description                                 | Stack                 |
| ----------------------------------- | ------------------------------------------- | --------------------- |
| [`contracts`](contracts)     | 🖼 Smart contract ABIs | `json`, `ethereum` |
| [`functions`](functions)                  | 🚀 Lambda functions                              | `node`, `js`          |

## Prerequisites

Install the [Serverless Framework CLI](https://www.serverless.com/framework/docs/getting-started/).

## Getting Started

```bash
git clone https://github.com/BunsDev/Chainlink-Lending-Workshop.git
nvm use
npm install
```

### Set Environment Variables

You can find and update the function's configuration in [`serverless.yml`](https://github.com/BunsDev/serverless/blob/master/serverless.yml):

```yml
service: serverless
provider:
  name: aws
  runtime: nodejs12.x
  region: ap-southeast-1
  timeout: 30
  environment:
    DEFAULT_GAS_PRICE: 60_000_000_000
    MNEMONIC: ...
```

This example uses the following environment variables:

- `DEFAULT_GAS_PRICE`: Default gas price used when making write transactions.
- `MNEMONIC`: 12-word mnemonic used to derive an Ethereum address, make sure it's funded with Ether if you intend to write data to Ethereum!
- `SLACK_HOOK_URL`: The example sends messages to Slack using [Incoming Webhooks](https://api.slack.com/messaging/webhooks). You can get this URL from your Slack dashboard. (Optional)

> You can change your deployed function's environment variables on the fly from the AWS Lambda console.

### Triggering Function Locally

```bash
serverless invoke local --function exec
```

This will execute the smart contract function from your local machine.
Great for debugging and testing.

### Deploying to AWS

```bash
npm i -D serverless-dotenv-plugin
serverless deploy
```