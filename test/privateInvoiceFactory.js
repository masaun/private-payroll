const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.WebsocketProvider('ws://localhost:8545'));

const utils = require("@aztec/dev-utils");

const aztec = require("aztec.js");
const dotenv = require("dotenv");
dotenv.config();
const secp256k1 = require("@aztec/secp256k1");

const {
  proofs: { MINT_PROOF }
} = utils;

const { JoinSplitProof, MintProof } = aztec;

const PrivateInvoiceFactory = artifacts.require("./PrivateInvoiceFactory.sol");
const ACE = artifacts.require('./ACE.sol');
const ZKERC20 = artifacts.require('./ZKERC20/ZKERC20.sol');
const Dai = artifacts.require("Dai");

contract('Private Invoice Factory Tests', function(accounts) {
    let ace;
    let zKerc20;
    let dai;
    let privateInvoiceFactory;
    let bob;
    let sally;

    it("Setup", async function() {
        ace = await ACE.deployed();
        zKerc20 = await ZKERC20.deployed();
        dai = await Dai.deployed();
        privateInvoiceFactory = await PrivateInvoiceFactory.deployed();

        bob = secp256k1.accountFromPrivateKey(
            process.env.GANACHE_TESTING_ACCOUNT_0
        );
        sally = secp256k1.accountFromPrivateKey(
            process.env.GANACHE_TESTING_ACCOUNT_1
        );
    });

    it('Should be able to create a new privateInvoice', async () => {
        const _proofData = await web3.utils.randomHex(32);
        console.log('=== _proofData ===', _proofData);

        const _optionalMintProofId = 0;
        const _optionalInitialisationMint = [];

        await privateInvoiceFactory.createInvoice(dai.address, 
                                                  ace.address, 
                                                  _optionalMintProofId, 
                                                  _optionalInitialisationMint, 
                                                  zKerc20.address, 
                                                  _proofData);

        //const firstLoanAddress = await loanDappContract.loans(0);
        //assert.equal(firstLoanAddress > 0, true);
    });

})
