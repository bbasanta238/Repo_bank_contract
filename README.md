# Repo_bank_contract

Initialize hardhat Node
\$yarn hardhat node

Run deploy script in local noode
\$yarn hardhat run scripts/deploy.js --network localhost

Run hardhat development console
\$yarn hardhat console --network localhost

Initialize Factory contract
\$const functioninstance = await ethers.getContractFactory("Functions");

Attach factory contract instance
\$const functioncontract = await functioninstance.attac('...deployed contract address')

Get Signers
\$const [add1, add2, add3] = await ethers.getSigners();

----------------------------TESTING ACCOUNT CREATION----------------------------

\$await functioncontract.connect(add1).createAccount(1,10"ktm",1000);

\$await functioncontract.connect(add2).createAccount(2,11,"Ilam",70000);

Account Duplicacy test
\$await functioncontract.connect(add2).createAccount(1,11,"butwal",5000);
--Expected Output: transaction reverted: Account Already Exist

--------------------------------DEPOSIT TEST---------------------------------------

\$await functioncontract.connect(add1).deposit(1,500);

check balance
\$await fucntioncontract.connect(add1).getBalance(add1.address,1);

---------------------------------WITHDRAWL TEST------------------------------------

\$await functioncontract.connect(add1).withdraw(1,500);

check balance
\$await fucntioncontract.connect(add1).getBalance(add1.address,1);

Account insufficient balance test
\$await functioncontract.connect(add1).withdraw(1,1100);
--Expected Output: transaction reverted: Insufficient Balance

Account withdrawl invoker
\$await functioncontract.connect(add2).withdraw(1,100);
--Expected Output: transaction reverted: Account does not belongs to this Address

-------------------------------BALANCE TRANSFER TEST----------------------------------

\$await functioncontract.connect(add2).balanceTransfer(2,1,add1.address,500);

checkbalance
\$await fucntioncontract.connect(add2).getBalance(add1.address,1);

Handling unregistered account balance transfer
\$await functioncontract.connect(add2).balanceTransfer(2,3,add1.address,500);
--Expected Output: transaction reverted: Incorrect Account Number

-------------------------------BANK DATA AUTHORIZATION TEST---------------------------

\$await functioncontract.connect(add1).getBankData(10)

Trying to access from other address except from deployer address
\$await functioncontract.connect(add2).getBankData(10)
----Expected Output: transaction reverted: Unauthorized permission
