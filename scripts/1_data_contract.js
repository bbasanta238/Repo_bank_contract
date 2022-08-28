async function main() {
	const [deployer] = await ethers.getSigners();
	const datainstance = await ethers.getContractFactory("Data");
	const datadeploy = await datainstance.deploy();
	console.log("data token address :", datadeploy.address);
}

main()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error(error);
		process.exit(1);
	});
