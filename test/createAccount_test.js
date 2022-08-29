const { expect } = require("chai");
// const { ethers } = require("hardhat");

describe("account creation test", function () {
	let Data, add1, add2, hardhatDataContract;
	beforeEach(async () => {
		[add1, add2] = await ethers.getSigners();
		Data = await ethers.getContractFactory("functions");
		hardhatDataContract = await Data.deploy();
	});

	it("should create an account if all the required valid arguments are passed", async function () {
		await expect(
			hardhatDataContract.connect(add1).createAccount(1, 10, "kathmandu", 1000)
		)
			.to.emit(hardhatDataContract, "eventAccountCreation")
			.withArgs(add1.address, 1);
	});

	//error handle using try catch
	it("should not create an account that is already exist", async () => {
		try {
			await hardhatDataContract
				.connect(add1)
				.createAccount(1, 10, "kathmandu", 1000);
			await hardhatDataContract
				.connect(add2)
				.createAccount(1, 20, "butwal", 500);
		} catch (error) {
			console.log("Catched Reverted transaction");
		}
	});

	//reverted error checking using revertedWIth
	it("should revert transaction with error Account Already Exist", async () => {
		await hardhatDataContract
			.connect(add1)
			.createAccount(1, 10, "kathmandu", 1000);
		await expect(
			hardhatDataContract.connect(add2).createAccount(1, 20, "butwal", 500)
		).to.be.revertedWith("Account Already Exist");
	});
});
