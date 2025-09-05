import eurosFormatter from './euroFormatter.js';

function createWallet(name, cash = 0) {
  // Private(not that much ) properties using naming convention
  let _dailyAllowance = 40;
  let _dayTotalWithdrawals = 0;

  return {
    _name: name,
    _cash: cash,

    deposit: function (amount) {
      this._cash += amount;
    },

    withdraw: function (amount) {
      if (this._cash - amount < 0) {
        console.log(`Insufficient funds!`);
        return 0;
      }

      if (_dayTotalWithdrawals + amount > _dailyAllowance) {
        console.log(`Insufficient remaining daily allowance!`);
        return 0;
      }
// forgot what im doing mid way and just stare at the screen 
      this._cash -= amount;
      _dayTotalWithdrawals += amount;
      return amount;
    },

    transferInto: function (wallet, amount) {
      console.log(
        `Transferring ${eurosFormatter.format(amount)} from ${this._name} to ${wallet.getName()}`
      );
      const withdrawnAmount = this.withdraw(amount);
      wallet.deposit(withdrawnAmount);
    },

    reportBalance: function () {
      console.log(
        `Name: ${this._name}, balance: ${eurosFormatter.format(this._cash)}`
      );
    },

    getName: function () {
      return this._name;
    },

    setDailyAllowance: function (newAllowance) {
      _dailyAllowance = newAllowance;
      console.log(
        `Daily allowance set to: ${eurosFormatter.format(newAllowance)}`
      );
    },

    resetDailyAllowance: function () {
      _dayTotalWithdrawals = 0;
    },
  };
}

function main() {
  const walletJack = createWallet('Jack', 100);
  const walletJoe = createWallet('Joe', 10);
  const walletJane = createWallet('Jane', 20);

  walletJack.transferInto(walletJoe, 50);
  walletJack.setDailyAllowance(80);
  walletJack.transferInto(walletJoe, 50);

  walletJane.transferInto(walletJoe, 25);
  walletJane.deposit(20);
  walletJane.transferInto(walletJoe, 25);

  walletJack.reportBalance();
  walletJoe.reportBalance();
  walletJane.reportBalance();
}

main();
