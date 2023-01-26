// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

interface IMarket {
 function updateExchangeRate() external returns (bool updated, uint256 rate);
}

contract MarketUpdater {
    IMarket[] public markets;
    address private owner;

    constructor() {
        owner = msg.sender;
    }
    // adds: market to list.
    function addMarket(address _market) external {
        require(msg.sender == owner, 'onlyOwner');
        markets.push(IMarket(_market));
    }
    // refreshes: all oracles
    function updateAll() external {
        for (uint id = 0; id < markets.length; ++id) { 
            markets[id].updateExchangeRate(); 
        }
    }
}