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
		// await hardhatDataContract.connect(add2).createAccount(2,11,"Butwal",500);
	});

	it("should deposit amount in given account number", async function () {
		//checking event emittion
		await expect(hardhatDataContract.connect(add2).deposit(1, 300))
			.to.emit(hardhatDataContract, "eventBalanceDeposit")
			.withArgs(add2.address, 1, 300);
	});
});
