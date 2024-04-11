import web3 from './common.mjs';

const ret = web3.eth.accounts.create();
console.log(ret);

// TODO: create mnemonic