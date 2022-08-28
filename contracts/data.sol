//SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;

contract Data {
    // admin account address
    address admin;

    struct userInfo {
        // uint accountNumber;
        uint256 bankName;
        string branch;
        uint256 balance;
        bool isExists;
    }

    //struct for returning addressdata
    struct returnData {
        uint256 accountNumber;
        uint256 bankName;
        string branch;
        uint256 balance;
    }
    //array for returning data
    returnData[] public returnDataArray;

    //struct for returning bankdata
    struct returnBankData {
        uint256 accountNumber;
        string branch;
        uint256 balance;
    }
    //array for returning bankdata
    returnBankData[] public returnBankDataArray;

    //mappedUserInfo[add][accountnumber] = > userinfo struct
    mapping(address => mapping(uint256 => userInfo)) mappedUserInfo;

    //array to store addresses
    address[] public addresses;

    //arry to store bank account
    uint256[] public accounts;
}
