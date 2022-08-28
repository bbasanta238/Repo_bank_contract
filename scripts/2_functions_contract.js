async function main() {
	const [deployer] = await ethers.getSigners();
	const functioninstance = await ethers.getContractFactory("Functions");
	const functiondeploy = await functioninstance.deploy();
	console.log("function token address : ", functiondeploy.address);
}

main()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error(error);
		process.exit(1);
	});
