import { UpdateCallRejectedError } from "@dfinity/agent";
import { dbank } from "../../declarations/dbank";

window.addEventListener("load", async function() {
  update() ;
});

document.querySelector("form").addEventListener("submit", async function(event) {
  event.preventDefault() ;

  const button = event.target.querySelector("#submit-btn") ;
  const inputAmount = parseFloat(document.getElementById("input-amount").value) ;
  const outputAmount = parseFloat(document.getElementById("withdrawal-amount").value) ;

  button.setAttribute("disabled", true) ;

  // my additions
  if( document.getElementById("amnt").value.length != 0 ) {
    const new_amnt = parseFloat(document.getElementById("amnt").value) ;
    await dbank.reset_balance(new_amnt) ;
  };

  if( document.getElementById("intrst").value.length != 0 ) {
    const new_intrst = parseFloat(document.getElementById("intrst").value) ;
    await dbank.reset_interest(new_intrst) ;
  };

  if(document.getElementById("input-amount").value.length != 0) await dbank.topUp(inputAmount) ;
  if(document.getElementById("withdrawal-amount").value.length != 0) await dbank.withdraw(outputAmount) ;

  await dbank.compound() ;
  update() ;
  document.getElementById("input-amount").value = "" ;
  document.getElementById("withdrawal-amount").value = "" ;
  document.getElementById("amnt").value = "" ;
  document.getElementById("intrst").value = "" ;
  button.removeAttribute("disabled") ;

});

async function update() {
  const currentAmount = await dbank.checkBalance() ;
  document.getElementById("value").innerText = Math.round( currentAmount*100 )/100 ;
  document.getElementById("amnt").innerText = currentAmount ;
  document.getElementById("intrst").innerText = await dbank.getInterestRate() ;
};

