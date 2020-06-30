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


    ///--------------------------------------------------------------------------///

    const getProofData = async function() {
        const bobNote1 = await aztec.note.create(bob.publicKey, 100);

        const newMintCounterNote = await aztec.note.create(bob.publicKey, 100);
        const zeroMintCounterNote = await aztec.note.createZeroValueNote();
        const sender = privateInvoiceFactory.address;
        //const sender = accounts[0];
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

        return (_proof, _proofData);
    }

    it("Test of getting proofData", async function() {
        var _proof;
        var _proofData;

        _proof, _proofData = await getProofData();
    });


    describe('Create a new privateInvoice', async () => {
        it('Should be able to create a new privateInvoice', async () => {
            var _proof;
            var _proofData;
            _proof, _proofData = await getProofData();
            //console.log('=== _proofData ===', _proofData);

            const _optionalMintProofId = 0;
            const _optionalInitialisationMint = [];

            await privateInvoiceFactory.createInvoice(dai.address, 
                                                      ace.address, 
                                                      _optionalMintProofId, 
                                                      _optionalInitialisationMint, 
                                                      zKerc20.address, 
                                                      _proofData);
        });

        it('Should be able to create a new privateInvoice (=2nd time)', async () => {
            var _proof;
            var _proofData;
            _proof, _proofData = await getProofData();
            //console.log('=== _proofData ===', _proofData);

            const _optionalMintProofId = 0;
            const _optionalInitialisationMint = [];

            await privateInvoiceFactory.createInvoice(dai.address, 
                                                      ace.address, 
                                                      _optionalMintProofId, 
                                                      _optionalInitialisationMint, 
                                                      zKerc20.address, 
                                                      _proofData);
        });

        it('Get Invoice Addresses List', async () => {
            const sender = privateInvoiceFactory.address;
            let invoiceAddressList = await privateInvoiceFactory.getInvoiceAddressList({ from: sender });
            console.log('=== getInvoiceAddressList ===\n', invoiceAddressList);        
        });
    });


    describe('Confidential Transfer', async () => {
        it('Should be able to execute confidential transfer', async () => {
            const sender = privateInvoiceFactory.address;
            let invoiceAddressList = await privateInvoiceFactory.getInvoiceAddressList({ from: sender });
            console.log('=== getInvoiceAddressList ===\n', invoiceAddressList);


            /// Create instance of PrivateInvoice contract
            let PrivateInvoice = {};
            PrivateInvoice = require("../build/contracts/PrivateInvoice.json");

            let privateInvoice = null;
            let PRIVATE_INVOICE_ADDRESS = invoiceAddressList[0];
            privateInvoice = new web3.eth.Contract(
                PrivateInvoice.abi,
                PRIVATE_INVOICE_ADDRESS,
            );
            //console.log('=== privateInvoice ===', privateInvoice);            


            // bob needs to pay sally for a taxi
            // the taxi is 25
            // if bob pays with his note worth 100 he requires 75 change
            console.log("Bob takes a taxi, Sally is the driver");
            const sallyTaxiFee = await aztec.note.create(sally.publicKey, 25);

            console.log("The fare comes to 25");
            const bobNote2 = await aztec.note.create(bob.publicKey, 75);
            const sendProofSender = PRIVATE_INVOICE_ADDRESS;
            const withdrawPublicValue = 0;
            const publicOwner = PRIVATE_INVOICE_ADDRESS;

            const bobNote1 = await aztec.note.create(bob.publicKey, 100);
            const mintedNotes = [bobNote1];

            const sendProof = new JoinSplitProof(
                mintedNotes,
                [sallyTaxiFee, bobNote2],
                sendProofSender,
                withdrawPublicValue,
                publicOwner
            );

            console.log('=== Test1 where are reached unitl ===');            

            const sendProofData = sendProof.encodeABI(PRIVATE_INVOICE_ADDRESS);
            const sendProofSignatures = sendProof.constructSignatures(
                PRIVATE_INVOICE_ADDRESS,
                [bob]
            );

            console.log('=== Test2 where are reached unitl ===');            

            let res2 = await privateInvoice.methods["confidentialTransfer(uint24,bytes,bytes)"](
                sendProofData,
                sendProofSignatures,
                {
                    from: privateInvoice.address
                }
            );

            console.log("Bob paid sally 25 for the taxi and gets 75 back");
        });
    });
})
