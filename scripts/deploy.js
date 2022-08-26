// const { ethers } = require("ethers");

async function main() {
	const [deployer] = await ethers.getSigners();
	console.log("deployer address", deployer.address);
	const datainstance = await ethers.getContractFactory("Data");
	const functioninstance = await ethers.getContractFactory("Functions");
	const datadeploy = await datainstance.deploy();
	const functiondeploy = await functioninstance.deploy();
	console.log("function token address : ", functiondeploy.address);
	console.log("data token address :", datadeploy.address);
}

main()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error(error);
		process.exit(1);
	});
