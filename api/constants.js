const BN = require("bn.js")
const API_BASE_URL = 'http://localhost:3002'
const CHAIN_ID = 250
const RPC = 'https://rpc.ankr.com/fantom'

const FTM_ORACLE = '0xf4766552d15ae4d256ad41b6cf2933482b0680dc'
const ETH_ORACLE = '0x11ddd3d147e5b83d01cee7070027092397d63658'
const BTC_ORACLE = '0x8e94c22142f4a64b99022ccdd994f4e9ec86e4b4'

module.exports = {
  API_BASE_URL, CHAIN_ID, RPC,
  FTM_ORACLE, ETH_ORACLE, BTC_ORACLE
}
