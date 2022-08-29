const { expect } = require("chai");

describe("Constructor test", function () {
	it("Value should be assigned to a Admin variable (admin is initalized using constructor)", async function () {
		const [owner] = await ethers.getSigners();
		const Data = await ethers.getContractFactory("functions");
		const hardhatDataContract = await Data.deploy();
		expect((await hardhatDataContract.admin()) == owner.address);
		// console.log(await hardhatDataContract.admin());
	});
});
