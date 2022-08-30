const { expect } = require("chai");

describe("Deposit method test", function () {
	let Data, add1, add2, hardhatDataContract;
	beforeEach(async () => {
		[add1, add2] = await ethers.getSigners();
		Data = await ethers.getContractFactory("functions");
		hardhatDataContract = await Data.deploy();
		await hardhatDataContract
			.connect(add1)
			.createAccount(1, 10, "kathmandu", 1000);
		await hardhatDataContract.connect(add2).deposit(1, add1.address, 300);
		// await hardhatDataContract.connect(add2).createAccount(2,11,"Butwal",500);
	});

	it("should deposit amount in given account number", async function () {
		expect(
			(await hardhatDataContract.connect(add1).personalInfo())[0].balance
		).to.equal(1300);
		const res = await hardhatDataContract.connect(add1).personalInfo();
	});

	it("should not deposit amount in given account number that does not exitst", async function () {
		await expect(
			hardhatDataContract.connect(add1).deposit(2, add2.address, 100)
		).to.be.revertedWith("Incorrect Account Number");
	});
});
