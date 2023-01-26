const Web3 = require('web3');
const { RPC } = require("../constants");

const clients = {ftm: []};

clients.ftm.push(new Web3(RPC));

const ftmRandomClient = () => clients.ftm[~~(clients.ftm.length * Math.random())];

module.exports = {
  get ftmWeb3() {
    return ftmRandomClient();
  },

  web3Factory: chainId => {
    switch (chainId) {
      case 250:
        return ftmRandomClient();
    }
  },
};
