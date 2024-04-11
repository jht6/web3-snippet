import web3 from './common.mjs';

const address = 'YOUR_ACCOUNT';
const balance = await web3.eth.getBalance(address);
console.log('balance:', balance);