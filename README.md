
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

2. Also in hardhat config: 

You can load up accounts and then access them via ethers.signers

```
module.exports = {
  networks: {
    // in built test network to use when developing contracts
    hardhat: {
      chainId: 1337
    },
    quickstart: {
      url: "http://127.0.0.1:8545",
      chainId: 1337,
      // test accounts only, all good ;)
      accounts: [
        "0x8f2a55949038a9610f50fb23b5883af3b4ecb3c3bb792cbcefbd1542c692be63",
        "0xc87509a1c067bbde78beb793e6fa76530b6382a4c0241e5e4a9ec0a0f44dc0d3",
        "0xae6ae8e5ccbfb04590405997ee2d52d2b330726137b875053c36d94e974d162f"
      ]
    },
  }
}
```
then call 
```
const [owner, otherAccount] = await ethers.getSigners();
```

3. Ethers

```
import {ethers} = require("ethers");
import { HDNodeWallet } from 'ethers';
let node = ethers.HDNodeWallet.fromMnemonic(words)
```

4. Ethers with Metmask
```
const provider = new ethers.BrowserProvider(window.ethereum)
```

#### Load wallet from existing privateKey

1. Simple use case
```
import { ethers } from "hardhat"
const provider = new ethers.JsonRpcApiProvider("JSON-RPC-http-endpoint");
const wallet = new ethers.Wallet("0xMY_PRIVATE_KEY");
const signer = wallet.connect(provider);

# optionally with a provider directly
const wallet = new ethers.Wallet("0xMY_PRIVATE_KEY", provider);
```

2. With password and encryption/decryption
```
import CryptoJS from 'crypto-js';
import { ethers } from "hardhat"

const key = localStorage.getItem('encryptedPrivateKey');
const bytes = CryptoJS.AES.decrypt(key, password);
const privateKey = bytes.toString(CryptoJS.enc.Utf8);
const wallet = new Wallet(privateKey, provider);

```

3. With the mneumonic of the key, where `your_selected_account`` is the account index to use, starting from 0.
```
const account = utils.HDNode.fromMnemonic(your_mnemonic_string).derivePath(`m/44'/60'/0'/0/${your_selected_account}`);
const signer = new Wallet(account, provider);
```
alternatively
```
const wallet: HDNodeWallet = await Wallet.fromPhrase(your_mnemonic_string);
```