
# Migrating from Truffle to Hardhat

## Contracts

See [here](./contracts/README.md)

## Tooling

In general you will swap out truffle and ganache for the following:
```
npm install --save-dev hardhat
```

Mocha as the default test runner, Chai as the assertion library, and the Hardhat Chai Matchers to extend Chai with contracts-related functionality. See the [package.json](./contracts/hardhat/package.json) file

## Testing

When moving to hardhat the big difference with testing locally is the lack of ganache. Hardhat has its own [`hardhat-network`](https://hardhat.org/hardhat-network/docs/overview#hardhat-network) built in that works really well and is configured in the [hardhat.config.js](./contracts/hardhat/hardhat.config.ts). If you choose to follow the same style as `ganache-cli` you can still do that like so:

```
npx hardhat node
```

and then to connect to this you just specify ```--network localhost``` for example ```npx hardhat run --network hardhat scripts/my-script.js```

## Wallets

### HD Wallet

#### New wallets with a Mnemonic

1. Hardhat config:

```
module.exports = {
  networks: {
    sepolia: {
      url: "...",
      accounts: {
        mnemonic: "test test test test test test test test test test test junk",
        path: "m/44'/60'/0'/0",
        initialIndex: 0,
        count: 20,
        passphrase: "",
      },
    },
  },
};
```

2. Ethers

```
import {ethers} = require("ethers");
import { HDNodeWallet } from 'ethers';
let node = ethers.HDNodeWallet.fromMnemonic(words)
```

3. Ethers with Metmask
```
const provider = new ethers.provider.Web3Provider(window.ethereum);
```

#### Load wallet from existing privateKey

```
import CryptoJS from 'crypto-js';
import { Wallet, formatEther } from 'ethers';

const key = localStorage.getItem('encryptedPrivateKey');
const bytes = CryptoJS.AES.decrypt(key, password);
const privateKey = bytes.toString(CryptoJS.enc.Utf8);
const wallet = new Wallet(privateKey, provider);

``````