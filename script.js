const moonArea = document.getElementById("moonArea");
const message = document.getElementById("message");
const menu = document.getElementById("menu");
const menuTrigger = document.getElementById("menuTrigger");
const menuPanel = document.getElementById("menuPanel");

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

const profileBtn = document.getElementById("profileBtn");
const profilePopup = document.getElementById("profilePopup");
const closeProfile = document.getElementById("closeProfile");

const confettiContainer = document.getElementById("confettiContainer");

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
        state = 1;
    }
});

message.addEventListener("click", () => {
    if (state === 1) {
        message.classList.remove("show");
        menu.classList.remove("show");
        moonArea.classList.remove("hovered");
        closeMenuPanel();
        state = 0;
    }
});

function openMenuPanel() {
    menu.classList.add("open");
}
function closeMenuPanel() {
    menu.classList.remove("open");
}
menuTrigger.addEventListener("click", (e) => {
    e.stopPropagation();
    menu.classList.toggle("open");
});
document.addEventListener("click", (e) => {
    if (!menu.contains(e.target)) {
        closeMenuPanel();
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
    closeMenuPanel();
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
    closeMenuPanel();
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
    makeConfetti();
}
closeResult.addEventListener("click", () => {
    resultPopup.classList.remove("show");
    moonArea.classList.remove("disabled");
    message.classList.remove("show");
    menu.classList.remove("show");
    closeMenuPanel();
    state = 0;
});

profileBtn.addEventListener("click", () => {
    profilePopup.classList.add("show");
    closeMenuPanel();
});
    closeProfile.addEventListener("click", () => {
    profilePopup.classList.remove("show");
});

function makeConfetti() {
    const pieces = 120;
    for (let i = 0; i < pieces; i++) {
        const c = document.createElement("span");
        c.className = "confetti";
        c.style.left = Math.random() * 100 + "%";
        c.style.animationDelay = Math.random() * 0.5 + "s";
        c.style.animationDuration = 2 + Math.random() * 1.5 + "s";
        c.style.transform = `rotate(${Math.random() * 360}deg)`;
        const size = 6 + Math.random() * 8;
        c.style.width = size + "px";
        c.style.height = size * 0.4 + "px";
        confettiContainer.appendChild(c);
    }
    setTimeout(() => {
        confettiContainer.innerHTML = "";
    }, 4000);
}
