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

const PrivateInvoice = artifacts.require("./PrivateInvoice.sol");
const ZkAssetMintable = artifacts.require("./ZkAssetMintable.sol");


advanceTime = (time) => {
    return new Promise((resolve, reject) => {
        web3.currentProvider.send({
            jsonrpc: "2.0",
            method: "evm_increaseTime",
            params: [time],
            id: new Date().getTime()
        }, (err, result) => {
            if (err) { return reject(err); }
            return resolve(result);
        });
    });
}

contract('Private Invoice Tests', function(accounts) {
    let instance1;
    let instance2;
    let privateInvoice;
    let bob;
    let sally;

    before('Setup contract for each test', async function () {});

    it("Setup", async function() {
        privateInvoice = await PrivateInvoice.deployed();

        bob = secp256k1.accountFromPrivateKey(
            process.env.GANACHE_TESTING_ACCOUNT_0
        );
        sally = secp256k1.accountFromPrivateKey(
            process.env.GANACHE_TESTING_ACCOUNT_1
        );
    });

    it("Execute _confidentialMint()", async function() {
        console.log("=== Bob wants to deposit 100 ===");
        const bobNote1 = await aztec.note.create(bob.publicKey, 100);

        const newMintCounterNote = await aztec.note.create(bob.publicKey, 100);
        const zeroMintCounterNote = await aztec.note.createZeroValueNote();
        const sender = accounts[0];
        const mintedNotes = [bobNote1];

        const mintProof = new MintProof(   /// MintProof instance is called from aztec.js
            zeroMintCounterNote,
            newMintCounterNote,
            mintedNotes,
            sender
        );

        const mintData = mintProof.encodeABI();

        const _proof = MINT_PROOF;
        const _proofData = mintData;
        privateInvoice._confidentialMint(_proof, _proofData, { from: accounts[0] });
    });

    it("Test 2", async function() {});
})
