const { expect } = require("chai");

describe("Balance transfer method test", function () {
	let Data, add1, add2, add3, hardhatDataContract;
	beforeEach(async () => {
		[add1, add2, add3] = await ethers.getSigners();
		Data = await ethers.getContractFactory("functions");
		hardhatDataContract = await Data.deploy();
		await hardhatDataContract
			.connect(add1)
			.createAccount(1, 10, "kathmandu", 1000);
		await hardhatDataContract.connect(add2).createAccount(2, 11, "Butwal", 500);
		// await hardhatDataContract.connect(add2).createAccount(2,11,"Butwal",500);
	});

	it("should transfer balance from a account", async function () {
		//checking event emittion
		await expect(
			hardhatDataContract.connect(add1).balanceTransfer(1, 2, add2.address, 100)
		)
			.to.emit(hardhatDataContract, "eventBalanceTransfer")
			.withArgs(1, 2, 100);

		const res = await hardhatDataContract.connect(add1).personalInfo();
		console.log("account Number ", res[0].accountNumber.value);
	});

	it("should revert transaction with error Incorrect Account Number", async () => {
		await expect(
			hardhatDataContract.connect(add3).balanceTransfer(1, 2, add2.address, 100)
		).to.be.revertedWith("Insufficient Balance");
	});

	it("should revert transaction with error Insufficient Balance", async () => {
		await expect(
			hardhatDataContract
				.connect(add1)
				.balanceTransfer(1, 2, add2.address, 1001)
		).to.be.revertedWith("Insufficient Balance");
	});
});
