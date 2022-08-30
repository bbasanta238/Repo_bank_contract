const { expect } = require("chai");

describe("Withdrawl method test", function () {
	let Data, add1, add2, hardhatDataContract;
	beforeEach(async () => {
		[add1, add2] = await ethers.getSigners();
		Data = await ethers.getContractFactory("functions");
		hardhatDataContract = await Data.deploy();
		await hardhatDataContract
			.connect(add1)
			.createAccount(1, 10, "kathmandu", 1000);
		// await hardhatDataContract.connect(add2).createAccount(2,11,"Butwal",500);
	});

	it("should reduced the amounnt from withdrawl account", async function () {
		//checking event emittion
		await expect(hardhatDataContract.connect(add1).withdraw(1, 300))
			.to.emit(hardhatDataContract, "eventBalanceWithdraw")
			.withArgs(add1.address, 1, 300);

		expect(
			(await hardhatDataContract.connect(add1).personalInfo())[0].balance
		).to.equal(700);
	});

	it("should revert transaction with error Insufficient Balance", async () => {
		await expect(
			hardhatDataContract.connect(add1).withdraw(1, 1500)
		).to.be.revertedWith("Insufficient Balance");
	});

	it("should revert transaction with error Account does not belongs to this Address", async () => {
		await expect(
			hardhatDataContract.connect(add2).withdraw(1, 100)
		).to.be.revertedWith("Account does not belongs to this Address");
	});
});
