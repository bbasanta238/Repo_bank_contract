// const web3 = require("Web3");
import web3 from "web3";

const connect = () => {
	if (typeof window.ethereum == "undefined") {
		alert("Please Install Metamask");
	} else {
		console.log("hi");
	}
};

export { connect };
