# Private Invoice

***
## 【Introduction of Private Invoice】
- This is a dApp that ...

&nbsp;

## 【User Flow】

&nbsp;

***

## 【Setup】
### Setup wallet by using Metamask
1. Add MetaMask to browser (Chrome or FireFox or Opera or Brave)    
https://metamask.io/  


2. Adjust appropriate newwork below 
```
Rinkeby Test Network
```

&nbsp;


### Setup backend
1. Deploy contracts to Rinkeby Test Network
```
(root directory)

$ npm run migrate:rinkeby
```

&nbsp;


### Setup frontend
1. Move to `./client`
```
$ cd client
```

2. Add an `.env` file under the directory of `./client`.
```
$ cp .env.example .env
```

3. Execute command below in root directory.
```
$ npm run client
```

4. Access to browser by using link 
```
http://127.0.0.1:3000/tellor-chainrunner-project
```

&nbsp;


***

## 【References】
- 【Protect Privacy🔐Hackathon】at Gitcoin
  - Maker：https://gitcoin.co/issue/makerdao/community/585/4432
  - Keep：https://gitcoin.co/issue/keep-network/Protect-Privacy-Hackathon/1/4457


