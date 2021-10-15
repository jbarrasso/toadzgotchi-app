// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { ethers } from "ethers";

export default async function initToadzgotchi() {
  
  let feedButton = document.getElementById("feedButton");
  let playButton = document.getElementById("playButton");
  let restButton = document.getElementById("sleepButton");

  feedButton.addEventListener("click", setHungerBar)
  playButton.addEventListener("click", setMoodBar)
  restButton.addEventListener("click", setRestBar)

  const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
  // Prompt user for account connections
  await provider.send("eth_requestAccounts", []);
  const signer = provider.getSigner();
  console.log("Account:", await signer.getAddress());
  
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