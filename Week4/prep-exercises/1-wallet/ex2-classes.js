import eurosFormatter from './euroFormatter.js';

class Wallet {
  #name;
  #cash;
  #dailyAllowance = 40;      // Maximum daily withdrawal
  #dayTotalWithdrawals = 0;  // Total withdrawn today

  constructor(name, cash = 0) {
    this.#name = name;
    this.#cash = cash;
  }

  // Getter for the name
  get name() {
    return this.#name;
  }

  // Deposit money
  deposit(amount) {
    this.#cash += amount;
  }

  // Withdraw money respecting cash and daily allowance
  withdraw(amount) {
    if (this.#cash - amount < 0) {
      console.log(`Insufficient funds!`);
      return 0;
    }

    if (this.#dayTotalWithdrawals + amount > this.#dailyAllowance) {
      console.log(`Insufficient remaining daily allowance!`);
      return 0;
    }

    this.#cash -= amount;
    this.#dayTotalWithdrawals += amount;
    return amount;
  }

  // Transfer money to another wallet
  transferInto(wallet, amount) {
    console.log(
      `Transferring ${eurosFormatter.format(amount)} from ${this.name} to ${wallet.name}`
    );
    const withdrawnAmount = this.withdraw(amount);
    wallet.deposit(withdrawnAmount);
  }

  // Set a new daily allowance
  setDailyAllowance(newAllowance) {
    this.#dailyAllowance = newAllowance;
    console.log(
      `Daily allowance set to: ${eurosFormatter.format(newAllowance)}`
    );
  }

  // Reset daily withdrawals
  resetDailyAllowance() {
    this.#dayTotalWithdrawals = 0;
  }
//headache
  // Report balance
  reportBalance() {
    console.log(
      `Name: ${this.name}, balance: ${eurosFormatter.format(this.#cash)}`
    );
  }
}

function main() {
  const walletJack = new Wallet('Jack', 100);
  const walletJoe = new Wallet('Joe', 10);
  const walletJane = new Wallet('Jane', 20);

  walletJack.transferInto(walletJoe, 50); // Jack to Joe
  walletJack.setDailyAllowance(80);        // Update Jack's daily allowance
  walletJack.transferInto(walletJoe, 50); // Jack to Joe again

  walletJane.transferInto(walletJoe, 25); // Jane to Joe (should fail if over allowance)
  walletJane.deposit(20);
  walletJane.transferInto(walletJoe, 25); // Jane to Joe
// I HATE ;
  walletJack.reportBalance();
  walletJoe.reportBalance();
  walletJane.reportBalance();
}

main();
