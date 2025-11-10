let money = 0;
let moneyPerClick = 1;
let arrows = 0;
let arrowInterval = 3000;
let passiveIncome = 0;
let multiplier = 1.0;

let arrowPrice = 50;
let speedPrice = 75;
let doublePrice = 1100;
let boostPrice = 600;

let silverArrowPrice = 1000;
let goldArrowPrice = 2000;
let diamondArrowPrice = 3000;

let silverArrowBought = false;
let goldArrowBought = false;
let diamondArrowBought = false;

const moneyDisplay = document.getElementById("money");
const ppcDisplay = document.getElementById("ppc");
const clickButton = document.getElementById("clickButton");

const arrowButton = document.getElementById("arrowButton");
const arrowSpeedButton = document.getElementById("arrowSpeedButton");
const doubleMoneyButton = document.getElementById("doubleMoneyButton");
const moneyBoostButton = document.getElementById("moneyBoostButton");

const autoStatus = document.getElementById("autoStatus");
const speedStatus = document.getElementById("speedStatus");
const doubleStatus = document.getElementById("doubleStatus");
const boostStatus = document.getElementById("boostStatus");

const toggleArrowMenu = document.getElementById("toggleArrowMenu");
const silverArrowButton = document.getElementById("silverArrowButton");
const goldArrowButton = document.getElementById("goldArrowButton");
const diamondArrowButton = document.getElementById("diamondArrowButton");

clickButton.addEventListener("click", () => {
  money += moneyPerClick * multiplier;
  updateDisplay();
});

arrowButton.addEventListener("click", () => {
  if (money >= arrowPrice) {
    money -= arrowPrice;
    arrows++;
    arrowPrice *= 2;
    startArrows();
    updateDisplay();
    arrowButton.textContent = `Kjøp pil (${arrowPrice} kr)`;
  }
});

arrowSpeedButton.addEventListener("click", () => {
  if (arrows === 0) {
    arrowSpeedButton.textContent =
      "Oppgrader pilhastighet = ikke tilgjengelig før pil er kjøpt";
    return;
  }

  if (arrowInterval <= 250) {
    arrowSpeedButton.textContent = "Oppgrader pilhastighet = maks";
    return;
  }

  if (money >= speedPrice) {
    money -= speedPrice;
    arrowInterval = Math.max(250, arrowInterval - 250);
    speedPrice *= 2;
    startArrows();
    updateDisplay();
    arrowSpeedButton.textContent =
      arrowInterval > 250
        ? `Oppgrader pilhastighet (${speedPrice} kr)`
        : "Oppgrader pilhastighet = maks";
  }
});

doubleMoneyButton.addEventListener("click", () => {
  if (money >= doublePrice) {
    money -= doublePrice;
    multiplier *= 2;
    doublePrice *= 2;
    updateDisplay();
    doubleMoneyButton.textContent = `2x penger (${doublePrice} kr)`;
  }
});

moneyBoostButton.addEventListener("click", () => {
  if (money >= boostPrice) {
    money -= boostPrice;
    passiveIncome += 1;
    boostPrice *= 2;
    updateDisplay();
    moneyBoostButton.textContent = `1+ kr per sekund (${boostPrice} kr)`;
  }
});

let arrowTimer = null;

function startArrows() {
  if (arrowTimer) clearInterval(arrowTimer);
  arrowTimer = setInterval(() => {
    money += arrows * moneyPerClick * multiplier;
    updateDisplay();
  }, arrowInterval);
}

toggleArrowMenu.addEventListener("click", () => {
  const menu = document.getElementById("arrowUpgradeMenu");
  menu.style.display = menu.style.display === "none" ? "block" : "none";
});

silverArrowButton.addEventListener("click", () => {
  if (!silverArrowBought && money >= silverArrowPrice) {
    money -= silverArrowPrice;
    moneyPerClick += 2;
    silverArrowBought = true;
    silverArrowButton.disabled = true;
    goldArrowButton.disabled = false;
    updateDisplay();
  }
});

goldArrowButton.addEventListener("click", () => {
  if (!goldArrowBought && money >= goldArrowPrice) {
    money -= goldArrowPrice;
    moneyPerClick += 2;
    goldArrowBought = true;
    goldArrowButton.disabled = true;
    diamondArrowButton.disabled = false;
    updateDisplay();
  }
});

diamondArrowButton.addEventListener("click", () => {
  if (!diamondArrowBought && money >= diamondArrowPrice) {
    money -= diamondArrowPrice;
    moneyPerClick += 2;
    diamondArrowBought = true;
    diamondArrowButton.disabled = true;
    updateDisplay();
  }
});

setInterval(() => {
  money += passiveIncome;
  updateDisplay();
}, 1000);

function updateStatus() {
  autoStatus.textContent =
    arrows > 0 ? `Pil = kjøpt (${arrows})` : "Pil = ikke kjøpt";

  if (arrowInterval <= 250) {
    speedStatus.textContent =
      "Oppgradering til pilhastighet = maks pilhastighetsoppgradering";
  } else {
    const seconds = arrowInterval / 1000;
    const displayTime = Number.isInteger(seconds)
      ? seconds
      : seconds % 1 === 0.5 || seconds % 1 === 0.25
      ? seconds
      : seconds.toFixed(2);
    speedStatus.textContent = `Oppgradering til pilhastighet = 1 klikk per ${displayTime} sekunder`;
  }
  doubleStatus.textContent = `2x penger = ${multiplier}x`;
  boostStatus.textContent = `1+ kr per sekund = ${passiveIncome}+`;
}

function updateDisplay() {
  moneyDisplay.textContent = Math.floor(money);
  ppcDisplay.textContent = Math.floor(moneyPerClick * multiplier);
  arrowButton.textContent = `Kjøp pil (${arrowPrice} kr)`;
  arrowSpeedButton.textContent = `Oppgrader pilhastighet (${speedPrice} kr)`;
  doubleMoneyButton.textContent = `2x penger (${doublePrice} kr)`;
  moneyBoostButton.textContent = `1+ kr per sekund (${boostPrice} kr)`;
  updateStatus();
}

updateDisplay();
