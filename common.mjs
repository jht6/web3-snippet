import Web3 from 'web3';

const web3 = new Web3(new Web3.providers.HttpProvider('https://rpc.sepolia.org/'));

export default web3;