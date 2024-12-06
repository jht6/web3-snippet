import Web3 from 'web3';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import * as rpcUrls from './common/rpc.mjs';

const rpc = rpcUrls.FACET_SEPOLIA;
const gasPriceGwei = '20';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
// secret内的私钥应以0x开头
const privateKey = fs.readFileSync(path.join(__dirname, '../secret'), 'utf8').trim();

const web3 = new Web3(new Web3.providers.HttpProvider(rpc));
const account = web3.eth.accounts.privateKeyToAccount(privateKey);
const gasPrice = web3.utils.toWei(gasPriceGwei, 'gwei');
const rawTransaction = {
    from: account.address,
    to: account.address,
    nonce: await web3.eth.getTransactionCount(account.address),
    value: 1,
    gasPrice: gasPrice,
    data: '0x',
};

// 预估gas
const gas = await web3.eth.estimateGas(rawTransaction);
console.log('预计耗费gas:', gas);
rawTransaction.gas = gas;

// 签名
const signedTransaction = await web3.eth.accounts.signTransaction(
    rawTransaction,
    account.privateKey
);

const txReceipt = await web3.eth.sendSignedTransaction(signedTransaction.rawTransaction);
console.log('Transaction Receipt:', txReceipt);
