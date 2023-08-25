
# Contracts and Deploying to a network

## Folder structure

This is an example of how you work with contracts, tests and deploying to a network. 

The standard folder structure for truffle is:
```
truffle
├── truffle-config.js       
├── contracts               // sample contracts 
├── migrations              // handy scripts eg: to deploy to a chain
├── test                    // contract tests
```

When migrating to hardhat this changes to:

```
hardhat
├── hardhat.config.ts       // hardhat network config
├── contracts               // sample contracts 
├── scripts                 // handy scripts eg: to deploy to a chain
├── test                    // contract tests
```

The truffle folder `migrations` effectively becomes `scripts` and a few changes here need to be made to deploy things to the chain of choice

Testing remains the same and should work fine, I'm using mocha here but any framework of choice will work the same

# Compile, test and deploy

Truffle compile and deploy works like so:
```
cd truffle
npm i
npx truffle compile
# run this in another tab
ganache-cli 
# run this in the original tab
npx truffle test
```

Hardhat compile and deploy works like so:
```
cd hardhat
npm i
npx hardhat compile
npx hardhat test
```