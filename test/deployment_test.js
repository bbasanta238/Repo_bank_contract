const { expect } = require("chai");

describe("Deployment testing", function () {
  it("Deployed owner should be the first account addres of owner", async function () {
    const [owner] = await ethers.getSigners();
    const Data = await ethers.getContractFactory("data");
    const hardhatDataContract = await Data.deploy();
    expect(typeof(hardhatDataContract.address) != null);
  });
});

