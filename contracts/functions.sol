//SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;

import "./data.sol";

contract functions is data {
    // constructor to initallize admin
    constructor() {
        admin = msg.sender;
    }

    //  ****************************** MODIFIERS ***************************************************************//

    //modifier to check if account number already exists or not during account creation
    modifier accountAlreadyExist(uint256 _accountNumber) {
        bool temp;
        for (uint256 i = 0; i < accounts.length; i++) {
            if (accounts[i] == _accountNumber) {
                temp = true;
                break;
            }
        }
        require(temp == false, "Account Already Exist");
        _;
    }

    // modifier to check balance is sufficient to withdraw or transfer
    modifier isSufficientBalance(
        uint256 _withdrawlAccount,
        uint256 _withdrawlBalance
    ) {
        require(
            mappedUserInfo[msg.sender][_withdrawlAccount].balance >=
                _withdrawlBalance,
            "Insufficient Balance"
        );
        _;
    }

    // modifier to check validation of bankAccount
    modifier isAccountExist(address _accountAddress, uint256 _accountNumber) {
        require(
            mappedUserInfo[_accountAddress][_accountNumber].isExists == true,
            "Incorrect Account Number"
        );
        _;
    }

    // modifier to check whether if the transferring account belongs to  invoker or not
    modifier isInvokerHasAccount(uint256 _accountNumber) {
        require(
            mappedUserInfo[msg.sender][_accountNumber].isExists == true,
            "Account does not belongs to this Address"
        );
        _;
    }

    // modifier to check only the admin can access all accounts data
    modifier isAdmin() {
        require(msg.sender == admin, "Unauthorized permission");
        _;
    }

    // ****************************************EVENTS *********************************************************//
    // event of account creation
    event eventAccountCreation(address accountAddress, uint256 accountNumber);

    // event for deposit
    event eventBalanceDeposit(
        address accountAddress,
        uint256 accountNumber,
        uint256 depositedBalance
    );

    // event for withdrawl
    event eventBalanceWithdraw(
        address accountAddress,
        uint256 accountNumber,
        uint256 withdrawlBalance
    );

    // events for transfer
    event eventBalanceTransfer(
        uint256 accountFrom,
        uint256 accountTo,
        uint256 transferedBalance
    );

    // event for admun change
    event eventAdminChange(address newAdmin);

    // ************************************** FUNCTIONS REQUIREMENT *********************************************//
    // function for account creation
    function createAccount(
        uint256 _accountNumber,
        uint256 _bankName,
        string memory _branch,
        uint256 _balance
    ) public accountAlreadyExist(_accountNumber) {
        //pushing into address array
        addresses.push(msg.sender);
        //pushing into accounts
        accounts.push(_accountNumber);
        mappedUserInfo[msg.sender][_accountNumber] = userInfo(
            _bankName,
            _branch,
            _balance,
            true
        );
        emit eventAccountCreation(msg.sender, _accountNumber);
    }

    //function for deposition
    function deposit(
        uint256 _accountNumber,
        address _toAccountAddress,
        uint256 _depositbalance
    ) public isAccountExist(_toAccountAddress, _accountNumber) {
        mappedUserInfo[_toAccountAddress][_accountNumber].balance =
            mappedUserInfo[_toAccountAddress][_accountNumber].balance +
            _depositbalance;
        emit eventBalanceDeposit(
            _toAccountAddress,
            _accountNumber,
            _depositbalance
        );
    }

    //function for withdrawl
    function withdraw(uint256 _accountNumber, uint256 _withdrawbalance)
        public
        isInvokerHasAccount(_accountNumber)
        isSufficientBalance(_accountNumber, _withdrawbalance)
    {
        mappedUserInfo[msg.sender][_accountNumber].balance =
            mappedUserInfo[msg.sender][_accountNumber].balance -
            _withdrawbalance;

        emit eventBalanceWithdraw(msg.sender, _accountNumber, _withdrawbalance);
    }

    //
    function personalInfo() public view returns (returnData[] memory) {
        //memory array for returning
        returnData[] memory specificData = new returnData[](accounts.length);
        uint256 counter;
        //returning specificAddress data
        for (uint256 i = 0; i < accounts.length; i++) {
            if (mappedUserInfo[msg.sender][accounts[i]].isExists == true) {
                returnData memory newstructData = returnData(
                    accounts[i],
                    mappedUserInfo[msg.sender][accounts[i]].bankName,
                    mappedUserInfo[msg.sender][accounts[i]].branch,
                    mappedUserInfo[msg.sender][accounts[i]].balance
                );
                specificData[counter] = newstructData;
                counter++;
            }
        }
        return specificData;
    }

    //for returning data of bank
    function getBankData(uint256 _bankName)
        public
        view
        isAdmin
        returns (returnBankData[] memory)
    {
        uint256 counter;
        returnBankData[] memory specificBankData = new returnBankData[](
            accounts.length
        );
        for (uint256 i = 0; i < addresses.length; i++) {
            for (uint256 j = 0; j < accounts.length; j++) {
                if (
                    mappedUserInfo[addresses[i]][accounts[j]].bankName ==
                    _bankName
                ) {
                    returnBankData memory newstructBankData = returnBankData(
                        accounts[j],
                        mappedUserInfo[addresses[i]][accounts[j]].branch,
                        mappedUserInfo[addresses[i]][accounts[j]].balance
                    );
                    specificBankData[counter] = newstructBankData;
                    counter++;
                }
            }
        }
        return specificBankData;
    }

    // transfering balance from one account to another
    function balanceTransfer(
        uint256 _fromAccount,
        uint256 _toAccount,
        address _toAddress,
        uint256 _balance
    )
        public
        isAccountExist(_toAddress, _toAccount)
        isSufficientBalance(_fromAccount, _balance)
    {
        mappedUserInfo[msg.sender][_fromAccount].balance =
            mappedUserInfo[msg.sender][_fromAccount].balance -
            _balance;
        mappedUserInfo[_toAddress][_toAccount].balance =
            mappedUserInfo[_toAddress][_toAccount].balance +
            _balance;

        emit eventBalanceTransfer(_fromAccount, _toAccount, _balance);
    }

    // get balance fucntion
    function getBalance(
        address _addressCheckBalance,
        uint256 _accountCheckBalance
    ) public view returns (uint256) {
        return (
            mappedUserInfo[_addressCheckBalance][_accountCheckBalance].balance
        );
    }

    //transfer admin ownership
    function changeAdmin(address _newAdmin) public isAdmin {
        admin = _newAdmin;
        emit eventAdminChange(_newAdmin);
    }
}
