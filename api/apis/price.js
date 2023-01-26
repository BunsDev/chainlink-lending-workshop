const { web3Factory } = require('../utils/web3')
// import Web3 from 'web3'
// import RPC from '../constants'
// const Web3 = require('web3');
// const { RPC } = require("../../constants");
// const web3Factory = require("../../utils/web3")
const {
    CHAIN_ID, FTM_ORACLE, ETH_ORACLE, BTC_ORACLE
} = require("../constants")

const clients = {ftm: []}


const web3 = web3Factory( CHAIN_ID );
const ORACLE_DIVISOR = 1e8

const ChainlinkOracleABI = require('../abis/ChainlinkOracleABI.json')
const FtmOracleContract = new web3.eth.Contract(ChainlinkOracleABI, FTM_ORACLE)
const EthOracleContract = new web3.eth.Contract(ChainlinkOracleABI, ETH_ORACLE)
const BtcOracleContract = new web3.eth.Contract(ChainlinkOracleABI, BTC_ORACLE)

async function getPrice(ctx) {
    // const tokenAddress = ctx.params.tokenAddress
    const symbol = ctx.params.symbol
    const OracleContract =
        symbol == 'eth'
        ? EthOracleContract
            : symbol == 'btc'
            ? BtcOracleContract
                : FtmOracleContract
    // const OracleContract = new web3.eth.Contract(ChainlinkOracleABI, tokenAddress)

    const price = await OracleContract.methods.latestAnswer().call() / ORACLE_DIVISOR

    return price
}

async function getPrices(ctx) {
    const ftmPrice = await FtmOracleContract.methods.latestAnswer().call() / ORACLE_DIVISOR
    const ethPrice = await EthOracleContract.methods.latestAnswer().call() / ORACLE_DIVISOR
    const btcPrice = await BtcOracleContract.methods.latestAnswer().call() / ORACLE_DIVISOR

    return {
        "ftmPrice": ftmPrice,
        "ethPrice": ethPrice,
        "btcPrice": btcPrice
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