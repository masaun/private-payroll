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


contract('Private Invoice Tests', function(accounts) {
    let instance1;
    let instance2;
    let privateInvoice;
    let privatePaymentContract;
    let bob;
    let sally;

    before('Setup contract for each test', async function () {});

    it("Setup", async function() {
        privateInvoice = await PrivateInvoice.deployed();
        privatePaymentContract = await ZkAssetMintable.deployed();

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
        let res1 = await privatePaymentContract.confidentialMint(_proof, _proofData, { from: accounts[0] });
        console.log('=== confidentialMint() ===\n', res1);

        console.log("completed mint proof");
        console.log("Bob successfully deposited 100");


        // -------------------------------------------------------------------------- //

        // bob needs to pay sally for a taxi
        // the taxi is 25
        // if bob pays with his note worth 100 he requires 75 change
        console.log("Bob takes a taxi, Sally is the driver");
        const sallyTaxiFee = await aztec.note.create(sally.publicKey, 25);

        console.log("The fare comes to 25");
        const bobNote2 = await aztec.note.create(bob.publicKey, 75);
        const sendProofSender = accounts[0];
        const withdrawPublicValue = 0;
        const publicOwner = accounts[0];

        const sendProof = new JoinSplitProof(
            mintedNotes,
            [sallyTaxiFee, bobNote2],
            sendProofSender,
            withdrawPublicValue,
            publicOwner
        );
        const sendProofData = sendProof.encodeABI(privatePaymentContract.address);
        const sendProofSignatures = sendProof.constructSignatures(
            privatePaymentContract.address,
            [bob]
        );
  
        // await privatePaymentContract.confidentialTransfer(sendProofData, sendProofSignatures, { from: accounts[0] });
        let res2 = await privatePaymentContract.methods["confidentialTransfer(bytes,bytes)"](
            sendProofData,
            sendProofSignatures,
            {
                from: accounts[0]
            }
        );
        //console.log('=== confidentialTransfer() ===', res);

        console.log("Bob paid sally 25 for the taxi and gets 75 back");

    });


    it("Test 2", async function() {});
})
