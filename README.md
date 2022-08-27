# Repo_bank_contract

## Deployment

To deploy this project in hardhad node run

Initialize hardhat Node

```bash
 $yarn hardhat node
```

Run deploy script in local noode

```bash
 $yarn hardhat run scripts/deploy.js --network localhost
```

Run hardhat development console

```bash
 $yarn hardhat console --network localhost
```

Initialize Factory contract

```bash
 >const functioninstance = await ethers.getContractFactory("Functions");
```

Attach factory contract instance

```bash
 >const functioncontract = await functioninstance.attac('...deployed contract address')
```

Get Signers

```bash
 >const [add1, add2, add3] = await ethers.getSigners();
```

## Testing

### TESTING ACCOUNT CREATION

```bash
 >await functioncontract.connect(add1).createAccount(1,10"ktm",1000);
 >await functioncontract.connect(add2).createAccount(2,11,"Ilam",70000);
```

#### Account Duplicacy test

```bash
 >await functioncontract.connect(add2).createAccount(1,11,"butwal",5000);
```

- Expected Output: transaction reverted: Account Already Exist

#### DEPOSIT TEST

```bash
 >await functioncontract.connect(add1).deposit(1,500);
 >await fucntioncontract.connect(add1).getBalance(add1.address,1);
```

#### WITHDRAWL TEST

```bash
 >await functioncontract.connect(add1).withdraw(1,500);
 >await fucntioncontract.connect(add1).getBalance(add1.address,1);
```

Account withdrawl Invalid invoker

```bash
 >await functioncontract.connect(add2).withdraw(1,100);
```

- Expected Output: transaction reverted: Account does not belongs to this Address

#### BALANCE TRANSFER TEST

```bash
 >await functioncontract.connect(add2).balanceTransfer(2,1,add1.address,500);
 >await fucntioncontract.connect(add2).getBalance(add1.address,1);
```

Handling unregistered account balance transfer

```bash
 >functioncontract.connect(add2).balanceTransfer(2,3,add1.address,500);
```

- Expected Output: transaction reverted: Incorrect Account Number

#### BANK DATA AUTHORIZATION TEST

```bash
 >await functioncontract.connect(add1).getBankData(10)
```

Trying to access from other address except from deployer address

```bash
 >await functioncontract.connect(add2).getBankData(10)
```

- Expected Output: transaction reverted: Unauthorized permission
