const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.WebsocketProvider('ws://localhost:8545'));

const PrivateInvoice = artifacts.require("./PrivateInvoice.sol");

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


    beforeEach('Setup contract for each test', async function () {});

    it("Setup", async function() {
        privateInvoice = await PrivateInvoice.deployed();
    });

    it("Test 1", async function() {});

    it("Test 2", async function() {});
})
