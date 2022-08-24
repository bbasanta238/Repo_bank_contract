//SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;


contract Data{

struct userInfo{
    // uint accountNumber;
    uint bankName;
    string branch;
    uint balance;
    bool isExists;
}

//struct for returning addressdata
struct returnData {
    uint accountNumber;
    uint bankName;
    string branch;
    uint balance;
}
//array for returning data
returnData[] public returnDataArray;

//struct for returning bankdata
struct returnBankData{
    uint accountNumber;
    string branch;
    uint balance;
}
//array for returning bankdata
returnBankData[] public returnBankDataArray;



//mappedUserInfo[add][accountnumber] = > userinfo struct
mapping(address => mapping(uint => userInfo)) mappedUserInfo;

//array to store addresses
address[] public addresses;

//arry to store bank account
uint[] public accounts;

}