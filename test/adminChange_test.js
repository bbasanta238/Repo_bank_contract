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
		await hardhatDataContract.connect(add2).createAccount(2, 10, "Butwal", 500);
		// await hardhatDataContract.connect(add2).createAccount(2,11,"Butwal",500);
	});

	it("should change the address of admin", async function () {
		//checking event emittion
		await expect(hardhatDataContract.connect(add1).changeAdmin(add2.address))
			.to.emit(hardhatDataContract, "eventAdminChange")
			.withArgs(add2.address);

		expect(await hardhatDataContract.connect(add1).admin()).to.equal(
			add2.address
		);
		// console.log(res);
	});

	it("should revert transaction with error Unauthorized permission if user other than admin tries to transfer admin role to other", async () => {
		await expect(
			hardhatDataContract.connect(add2).changeAdmin(add2.address)
		).to.be.revertedWith("Unauthorized permission");
	});
});
