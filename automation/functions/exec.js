const axios = require('axios')
const ethers = require('ethers')
const { abis, addresses } = require('../constants')

exports.handler = async function() {
  console.log('Starting...')
  // loads: ABIs
  const MarketUpdaterABI = abis.MarketUpdater;
  const MarketUpdaterAddress = addresses.MarketUpdater;
  console.log('Contract ABIs loaded')

  // initializes: Wallet
  const chainId = '250'
  const provider = // new ethers.getProvider(parseInt(chainId))
  new ethers.providers.JsonRpcProvider('https://rpc.ftm.tools', parseInt(chainId))
  let wallet = ethers.Wallet.fromMnemonic(process.env.MNEMONIC)
  wallet = wallet.connect(provider)
  console.log('Wallet Loaded')

  // loads: Contract
  const contract = new ethers.Contract(
    MarketUpdaterAddress,
    MarketUpdaterABI,
    wallet,
  )
  console.log('Contract Loaded')
console.log('Sending Transaction...')
  try {
    // const overrides = { gasPrice: process.env.DEFAULT_GAS_PRICE };
    const overrides = { gasPrice: 1_000_000_000_000 }; // 1,000 Gwei
    // sends: Transaction
    const tx = await contract.updateAll(overrides)
    const explorer = 'https://ftmscan.com'
    const successMessage = `:white_check_mark: Transaction sent ${explorer}/tx/${tx.hash}`
    console.log(successMessage)
    // await postToSlack(successMessage)
  } catch (err) {
    const errorMessage = `:warning: Transaction failed: ${err.message}`
    console.error(errorMessage)
    // await postToSlack(errorMessage)
    return err;
  }

  console.log('Completed')
  return true;
}

// Sends: Success Message to Slack
// function postToSlack(text) {
//   const payload = JSON.stringify({ 
//     text,
//   })
//   return axios.post(process.env.SLACK_HOOK_URL, payload)
// }