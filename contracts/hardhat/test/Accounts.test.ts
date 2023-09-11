import {
  time,
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai"
import { ethers } from "hardhat"
import { Wallet, HDNodeWallet } from "ethers";

describe("Accounts", function () {

  // Can specify the Mnemonic like this here and use it or embed it in the hardhat.config.ts
  // Pick whichever option makes sense to the tests
  const testMnemonicAccount = {
    mnemonic: "phrase upgrade clock rough situate wedding elder clever doctor stamp excess tent",
    address: "0xE18035BF8712672935FDB4e5e431b1a0183d2DFC",
    publicKey: "0x02fb53c4671e321af41b6cec8b6eef26f350aced1743ff08e5045ca0f05a9d6071",
    privateKey: "0x4cfd3e90fc78b0f86bf7524722150bb8da9c60cd532564d7ff43f5716514f553"
  }

  // Specify an account like so via its private key and test functionality with that
  const testAccount = {
    privateKey: "0x7C9529A67102755B7E6102D6D950AC5D5863C98713805CEC576B945B15B71EAC",
    address: "0x5CfE73b6021E818B776b421B1c4Db2474086a7e1"
  }

  async function accountsFixture() {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();
    return { owner, otherAccount };
  }

  describe("Get account from mnemonic", function () {
    it("Should get the default account", async function () {
      const {owner, otherAccount} = await loadFixture(accountsFixture);
      const wallet: HDNodeWallet = await Wallet.fromPhrase(testMnemonicAccount.mnemonic);

      expect(wallet.address).to.equal(testMnemonicAccount.address);
      expect(wallet.publicKey).to.equal(testMnemonicAccount.publicKey);
      expect(wallet.privateKey).to.equal(testMnemonicAccount.privateKey);
    });
  });
 
  describe("Get account from privateKey", function () {
    it("Should get the default account", async function () {
      const {owner, otherAccount} = await loadFixture(accountsFixture);
      const wallet = new ethers.Wallet(testAccount.privateKey);
      expect(wallet.address).to.equal(testAccount.address);
    });

  });

})
