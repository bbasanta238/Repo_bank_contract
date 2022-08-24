//SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;

import './data.sol';

contract Functions is Data{

function createAccount(uint _accountNumber, uint  _bankName, string memory _branch, uint _balance) public {
//pushing into address array
addresses.push(msg.sender);
//pushing into accounts
accounts.push(_accountNumber);
mappedUserInfo[msg.sender][_accountNumber]= userInfo(_bankName,_branch,_balance,true);
}

//function for deposition
function deposit(uint _accountNumber, uint _balance) public {
mappedUserInfo[msg.sender][_accountNumber].balance = mappedUserInfo[msg.sender][_accountNumber].balance + _balance;
}


//function for withdrawl
function withdraw(uint _accountNumber, uint _balance) public {
mappedUserInfo[msg.sender][_accountNumber].balance = mappedUserInfo[msg.sender][_accountNumber].balance - _balance;
}

function getSpecificAddressData() public view returns(returnData[] memory){
//memory array for returning
returnData[] memory specificData = new returnData[](accounts.length);
uint counter;
//returning specificAddress data
for(uint i=0; i<accounts.length; i++){
    if(mappedUserInfo[msg.sender][accounts[i]].isExists == true){
        returnData memory newstructData = returnData(accounts[i],mappedUserInfo[msg.sender][accounts[i]].bankName,mappedUserInfo[msg.sender][accounts[i]].branch,mappedUserInfo[msg.sender][accounts[i]].balance);
        specificData[counter]=newstructData;
        counter++;
    }   
}
 return specificData;
}



//for returning data of bank
function getBankData(uint _bankName) public view returns(returnBankData[] memory) {
uint counter;
returnBankData[] memory specificBankData = new returnBankData[](accounts.length);
for(uint i=0; i<addresses.length; i++){
    for(uint j=0; j<accounts.length; j++){
        if(mappedUserInfo[addresses[i]][accounts[j]].bankName == _bankName){
            returnBankData memory newstructBankData = returnBankData(accounts[j],mappedUserInfo[addresses[i]][accounts[j]].branch, mappedUserInfo[addresses[i]][accounts[j]].balance);
            specificBankData[counter] = newstructBankData;
            counter++;
        }
    }
}
return specificBankData;
}

}