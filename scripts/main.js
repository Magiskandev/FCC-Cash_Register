'use strict';

/*
Design a cash register drawer function checkCashRegister() that accepts purchase price as the first argument (price), payment as the second argument (cash), and cash-in-drawer (cid) as the third argument.

cid is a 2D array listing available currency.

The checkCashRegister() function should always return an object with a status key and a change key.

Return {status: "INSUFFICIENT_FUNDS", change: []} if cash-in-drawer is less than the change due, or if you cannot return the exact change.

Return {status: "CLOSED", change: [...]} with cash-in-drawer as the value for the key change if it is equal to the change due.

Otherwise, return {status: "OPEN", change: [...]}, with the change due in coins and bills, sorted in highest to lowest order, as the value of the change key.

Currency Unit	Amount
Penny	$0.01 (PENNY)
Nickel	$0.05 (NICKEL)
Dime	$0.1 (DIME)
Quarter	$0.25 (QUARTER)
Dollar	$1 (ONE)
Five Dollars	$5 (FIVE)
Ten Dollars	$10 (TEN)
Twenty Dollars	$20 (TWENTY)
One-hundred Dollars	$100 (ONE HUNDRED)

See below for an example of a cash-in-drawer array:

[
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100]
]
*/

function checkCashRegister(price, cash, cid) {

  let dev = [];
  let values = [100,20,10,5,1,0.25,0.1,0.05,0.01];
  let names = ['ONE HUNDRED', 'TWENTY', 'TEN', 'FIVE', 'ONE','QUARTER','DIME','NICKEL','PENNY'];
  let totalIn = 0;
  let devDada = 0;

  cid.forEach(arg => totalIn += arg[1]);

  var change = cash - price;

  console.log(`devuelta original: ${change}.`);

  const obj = {
    status: "OPEN",
    change: []
  }
  
  console.log(totalIn);
  
  change == totalIn ? obj.status = "CLOSED":
  obj.status = "INSUFFICIENT_FUNDS";

  if (obj.status === "CLOSED"){
    dev = cid;
  }

  else {
    for (let i = 0; i < values.length; i++){
      let enCaja = cid[values.length-(i+1)][1]

      if ((change/values[i]).toFixed(2) >= 1){
        if((change/values[i])*values[i] <= enCaja){
          dev.push([names[i],(Math.floor(change/values[i]))*values[i]])
          change = (change - ((Math.floor(change/values[i]))*values[i])).toFixed(2)

        }else{
          dev.push([names[i],enCaja])
          change = (change - enCaja).toFixed(2)

        }
      }
    }
  }

  dev.forEach(num => devDada += num[1])
  if (devDada < (cash - price)){
     obj.status = "INSUFFICIENT_FUNDS"
     dev = []
   }
Object.assign(obj.change,dev)
console.log(obj)
return obj;

}

checkCashRegister(19.5, 20, [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]) // {status: "CLOSED", change: [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]}

checkCashRegister(19.5, 20, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 1], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]) // {status: "INSUFFICIENT_FUNDS", change: []}.