// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function initToadzgotchi() {
  let feedButton = document.getElementById("feedButton");
  let playButton = document.getElementById("playButton");
  let restButton = document.getElementById("sleepButton");

  feedButton.addEventListener("click", setHungerBar)
  playButton.addEventListener("click", setMoodBar)
  restButton.addEventListener("click", setRestBar)
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