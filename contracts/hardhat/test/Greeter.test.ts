import {
  time,
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai"
import { ethers } from "hardhat"

describe("Greeter", function () {

  const defaultGreeting:string = "Hello";

  // We define a fixture to reuse the same setup in every test.
  // ie a fixture is a function that is only ran the first time it is invoked (& a snapshot is made of the hardhat network). 
  // On all subsequent invocations our fixture won’t be invoked, but rather the snapshot state is reset and loaded
  async function deployGreeterFixture() {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();
    const Greeter = await ethers.getContractFactory("Greeter")
    const greeter = await Greeter.deploy(defaultGreeting);
    const address = await greeter.getAddress();
    return { greeter, address, owner, otherAccount };
  }

  describe("Deployment", function () {
    it("Should default greeting", async function () {
      const {greeter, address} = await loadFixture(deployGreeterFixture);
      expect(await greeter.greet()).to.equal(defaultGreeting);
    });

    it("Should return the new greeting once it's changed", async function () {
      const newGreeting = "Hola, mundo!";
      const {greeter, address} = await loadFixture(deployGreeterFixture);
      const setGreetingTx = await greeter.setGreeting(newGreeting);
      // wait until the transaction is mined
      await setGreetingTx.wait();
      expect(await greeter.greet()).to.equal(newGreeting);
    })
  });
 
})
