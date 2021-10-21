// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Web3Provider } from "@ethersproject/providers";
import { ethers } from "ethers";

export default async function initToadzgotchi() {
  
  let connectWeb3Button = document.getElementById("connectWeb3Button");
  let feedButton = document.getElementById("feedButton");
  let playButton = document.getElementById("playButton");
  let restButton = document.getElementById("sleepButton");
  
  connectWeb3Button.addEventListener("click", connectToWeb3)
  feedButton.addEventListener("click", setHungerBar)
  playButton.addEventListener("click", setMoodBar)
  restButton.addEventListener("click", setRestBar)
    
}

async function connectToWeb3() {
  // Prompt user for account connections
  const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
  console.log(provider);
  await provider.send("eth_requestAccounts", []); //wait until user connects account before moving on
  const signer = provider.getSigner();
  console.log("Account:", await signer.getAddress());

  console.log(provider.connection.url);
  // if (provider.connection.url == 'metamask') {
  //   document.getElementById("connectWeb3Button").innerHTML = "hi";
  //   console.log("yoyooy");
  // }
}

async function setHungerBar() {
  let hunger = document.getElementById("hungerBar");
  hunger.value = 100;
}

async function setMoodBar() {
  let mood = document.getElementById("moodBar");
  mood.value = 100;
}

async function setRestBar() {
  let rest = document.getElementById("restBar");
  rest.value = 100;
}