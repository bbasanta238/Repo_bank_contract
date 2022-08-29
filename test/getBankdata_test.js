const { expect } = require("chai");

describe("Bank data permission test", function () {
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
	it("should give access to admin to get data", async function () {
		expect(hardhatDataContract.connect(add1).getBankData(10));
	});

	it("should not give access to other user except admin", async function () {
		await expect(
			hardhatDataContract.connect(add2).getBankData(10)
		).to.be.revertedWith("Unauthorized permission");
	});
});
