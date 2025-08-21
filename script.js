const moonArea = document.getElementById("moonArea");
const message = document.getElementById("message");
const menu = document.getElementById("menu");
const popup = document.getElementById("popup");
const fishArea = document.getElementById("fishArea");
const startFishing = document.getElementById("startFishing");
const resultPopup = document.getElementById("resultPopup");
const resultText = document.getElementById("resultText");
const playBtn = document.getElementById("playBtn");
const fishBtn = document.getElementById("fishBtn");
const playerNameInput = document.getElementById("playerName");
const closePopup = document.getElementById("closePopup");
const closeResult = document.getElementById("closeResult");
const counter = document.getElementById("counter");
const fishCounter = document.getElementById("fishCounter");
const stopFishing = document.getElementById("stopFishing");

let state = 0;
let fishCount = 0;
let fishing = false;
let audio = new Audio("music/music.mp3");

moonArea.addEventListener("mouseenter", () => {
  if (state === 0) moonArea.classList.add("hovered");
});
moonArea.addEventListener("mouseleave", () => {
  if (state === 0) moonArea.classList.remove("hovered");
});

moonArea.addEventListener("click", () => {
  if (state === 0) {
    message.classList.add("show");
    menu.classList.add("show");
    audio.play();
    playBtn.textContent = "⏸";
    state = 1;
  }
});

message.addEventListener("click", () => {
  if (state === 1) {
    message.classList.remove("show");
    menu.classList.remove("show");
    moonArea.classList.remove("hovered");
    state = 0; 
  }
});

playBtn.addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
    playBtn.textContent = "⏸";
  } else {
    audio.pause();
    playBtn.textContent = "▶";
  }
});

fishBtn.addEventListener("click", () => {
  popup.classList.add("show");
});
closePopup.addEventListener("click", () => {
  popup.classList.remove("show");
});

startFishing.addEventListener("click", () => {
  popup.classList.remove("show");
  fishCount = 0;
  fishCounter.textContent = 0;
  counter.classList.add("show");
  fishing = true;
  spawnFish();
  message.classList.remove("show");
  menu.classList.remove("show");
  moonArea.classList.remove("hovered");
  state = 0;
  moonArea.classList.add("disabled");
});

function spawnFish() {
  if (!fishing) return;
  const fish = document.createElement("div");
  fish.textContent = "🐠";
  fish.classList.add("fish");
  fish.style.left = Math.random() * 80 + 10 + "%";
  fishArea.appendChild(fish);
  fish.addEventListener("click", () => {
    if (!fishing) return;
    fishCount++;
    fishCounter.textContent = fishCount;
    fish.remove();
  });
  setTimeout(() => {
    if (fish.parentElement) fish.remove();
  }, 5000);
  setTimeout(spawnFish, 1500);
}

stopFishing.addEventListener("click", () => {
  endFishing();
});
function endFishing() {
  fishing = false;
  fishArea.innerHTML = "";
  const playerName = playerNameInput.value || "friend";
  resultText.textContent = `thank you ${playerName}, you're so kind. we got ${fishCount} fish. see you again!!`;
  resultPopup.classList.add("show");
  counter.classList.remove("show");
}
closeResult.addEventListener("click", () => {
  resultPopup.classList.remove("show");
  moonArea.classList.remove("disabled");
  message.classList.remove("show");
  menu.classList.remove("show");
  state = 0;
});
