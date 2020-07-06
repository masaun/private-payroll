# Private Payroll

***
## 【Introduction of Private Invoice】
- This is a smart contract for realizing the private payroll.
  - Private payroll mean that sending/receiving salaries without revealing the amount in the middle of payments.
  - Utilize Aztec-protocol (UTXO model) for creating private payroll.

***

## Setup
### ① Install modules
```
$ npm install
```

<br>

### ② Run ganache-cli
（Please make sure whether port number is `8545` or not）
```
$ ganache-cli
```

<br>

### ③ Compile contracts
```
$ npm run compile:local
```

<br>

### ④ Test contracts
```
$ npm run test:local
```


&nbsp;


***

## 【References】
- [Protect Privacy Hackathon]  
  - Maker：https://gitcoin.co/issue/makerdao/community/585/4432
  - Keep：https://gitcoin.co/issue/keep-network/Protect-Privacy-Hackathon/1/4457

<br>

- [Aztec] 
  - [Sample repos]  
    - loan-dapp-starter-kit   
      https://github.com/AztecProtocol/loan-dapp-starter-kit
    - aztec-ganache-starter-kit  
      https://github.com/AztecProtocol/aztec-ganache-starter-kit
 

  - [Doc]：aztec.js
    - UTXO model：https://docs.aztecprotocol.com/#/Introduction/UTXO%20model
    - API methons list：https://aztecprotocol.github.io/AZTEC/
    - a brief explanation： https://docs.aztecprotocol.com/#/aztec.js

