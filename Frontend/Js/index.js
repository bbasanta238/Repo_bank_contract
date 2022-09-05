// ABI
import ABI from "../ABI/contractABI.json" assert { type: "json" };

// metmask accounts
let accounts;
// contract
let contract;
// nav file
const getlink = document.querySelector("#getInfo");
let table = document.getElementById("informationTable");
let h = document.getElementById("hid");
console.log(h);
console.log(table);

// createAccount html file
const form = document.querySelector(".setForm");
const accNumber = document.querySelector("#accountNumber");
const bankName = document.querySelector("#bankName");
const branch = document.querySelector("#branch");
const balance = document.querySelector("#balance");

//function to connect to metamaks wallet : Runs when user visit this site
const connect = async () => {
	if (typeof window.ethereum == "undefined") {
		alert("Please Install Metamask");
	} else {
		accounts = await ethereum.request({ method: "eth_requestAccounts" });
	}
};
connect();

async function contractConnection() {
	const web3 = await new Web3(window.ethereum);
	console.log(web3);
	contract = new web3.eth.Contract(
		ABI,
		"0x5fbdb2315678afecb367f032d93f642f64180aa3"
	);
	console.log(contract);
}
contractConnection();

// function to create Account
if (form != null) {
	form.addEventListener("submit", (e) => {
		e.preventDefault();
		console.log("accounts", accounts[0]);
		console.log("from ss", contract);
		contract.methods
			.createAccount(
				accNumber.value,
				bankName.value,
				branch.value,
				balance.value
			)
			.send({ from: accounts[0] });
	});
}

// function to get personal Info
if (getlink != null) {
	getlink.addEventListener("click", async (e) => {
		console.log("getlink");
		const res = await contract.methods.personalInfo().call();
		console.log(res);
		console.log(table);
		// for (let i = 0; i < res.length; i++) {}
	});
}
