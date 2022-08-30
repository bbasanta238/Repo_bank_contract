const key = "f125a7aa8d17a932f2c65de5c83f6418152c3a6a23c45e937d575b6a9bb027d6";

const Web3 = require("web3");
// const  Web3 from "web3";
const ethNetwork = "http://localhost:8545";
// const abi =
const abi = require("../ABI/contractABI.json");

const web3 = new Web3(new Web3.providers.HttpProvider(ethNetwork));
web3.eth.getAccounts().then((res) => {
	console.log(res);
});
// const account = web3.eth.accounts.create();
// console.log(account);
let contract = new web3.eth.Contract(
	abi,
	"0xe7f1725e7734ce288f8367e1bb143e90bb3f0512"
);

const acc = async () => {
	return await web3.eth.accounts.privateKeyToAccount("0x" + key);
};

const getinfo = async () => {
	let account = await acc();
	const res = await contract.methods.personalInfo().call();

	console.log(res);
};

getinfo();
// acc();
