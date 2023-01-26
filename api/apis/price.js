const { web3Factory } = require('../utils/web3')

const {
    CHAIN_ID,
    NATIVE_ORACLE, ETH_ORACLE, BTC_ORACLE, BNB_ORACLE, LINK_ORACLE,
    ETH_ADDRESS, BTC_ADDRESS, BNB_ADDRESS, LINK_ADDRESS
} = require("../constants")

// constants //
const web3 = web3Factory(CHAIN_ID);
const ORACLE_DIVISOR = 1e8
const ChainlinkOracleABI = require('../abis/ChainlinkOracleABI.json')

// create: contracts //
const NativeOracleContract = new web3.eth.Contract(ChainlinkOracleABI, NATIVE_ORACLE)
const EthOracleContract = new web3.eth.Contract(ChainlinkOracleABI, ETH_ORACLE)
const BtcOracleContract = new web3.eth.Contract(ChainlinkOracleABI, BTC_ORACLE)
const BnbOracleContract = new web3.eth.Contract(ChainlinkOracleABI, BNB_ORACLE)
const LinkOracleContract = new web3.eth.Contract(ChainlinkOracleABI, LINK_ORACLE)

// gets: contract from a given input //
async function getContract(input) {
    if (input == 'eth' || input == ETH_ADDRESS) { return EthOracleContract }
    else if (input == 'btc' || input == BTC_ADDRESS) { return BtcOracleContract }
    else if (input == 'bnb' || input == BNB_ADDRESS) { return BnbOracleContract }
    else if (input == 'link' || input == LINK_ADDRESS) { return LinkOracleContract }

    else return NativeOracleContract
}

// gets: token price //
async function getPrice(ctx) {
    // ctx input (passed into URL) and converts to lowercase //
    const input = (ctx.params.input).toLowerCase()
    const OracleContract = await getContract(input)

    // calls: `latestAnswer` method to return price //
    const price = await OracleContract.methods.latestAnswer().call() / ORACLE_DIVISOR

    return price
}

async function getPrices(ctx) {
    const ftmPrice = await NativeOracleContract.methods.latestAnswer().call() / ORACLE_DIVISOR
    const ethPrice = await EthOracleContract.methods.latestAnswer().call() / ORACLE_DIVISOR
    const btcPrice = await BtcOracleContract.methods.latestAnswer().call() / ORACLE_DIVISOR
    const bnbPrice = await BnbOracleContract.methods.latestAnswer().call() / ORACLE_DIVISOR
    const linkPrice = await LinkOracleContract.methods.latestAnswer().call() / ORACLE_DIVISOR

    return {
        "ftmPrice": ftmPrice,
        "ethPrice": ethPrice,
        "btcPrice": btcPrice,
        "bnbPrice": bnbPrice,
        "linkPrice": linkPrice,
    }
}

async function tokenPrice(ctx) {
    ctx.body = (await getPrice(ctx))
}

async function tokenPrices(ctx) {
    ctx.body = (await getPrices(ctx))
}

const price = { tokenPrice, tokenPrices }

module.exports = price