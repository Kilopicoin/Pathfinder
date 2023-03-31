import Web3 from 'web3';


const HMY_RPC_URL = "https://api.s0.t.hmny.io";
//const web3 = new Web3(window.web3.currentProvider);
//const web3 = new Web3(window.ethereum);
const web3 = new Web3(HMY_RPC_URL);

/*
window.addEventListener("load", async () => {
  // Modern dapp browsers...
  if (window.ethereum) {
    window.web3 = new Web3(window.ethereum);
    try {
      // Request account access if needed
      await window.ethereum.enable();
    } catch (error) {
      // User denied account access...
    }
  }
  // Legacy dapp browsers...
  else if (window.web3) {
    window.web3 = new Web3(web3.currentProvider);
  }
  // Non-dapp browsers...
  else {
    console.log("Non-Ethereum browser detected. You should consider trying MetaMask!");
  }
});
*/

export default web3;