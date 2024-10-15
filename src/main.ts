import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

let growthRate: number = 0.0;
let moyais: number = 0;

const gameName = "Easter Island Generator";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

const moyaiClick = document.createElement("button");
moyaiClick.innerHTML = "🗿";
app.append(moyaiClick);

const counter = document.createElement("div");
counter.innerHTML = `0 Moyais`;
app.append(counter);

const growthRateDisplay = document.createElement("div");
growthRateDisplay.innerHTML = `${growthRate} Moyais per second`;
app.append(growthRateDisplay);

interface Item {
  name: string;
  cost: number;
  growthRate: number;
  numOwned: number;
  button?: HTMLButtonElement;
}

const availableItems: Item[] = [
  { name: "Stone Quarry", cost: 10, growthRate: 0.1, numOwned: 0 },
  { name: "Sculptor", cost: 100, growthRate: 2, numOwned: 0 },
  { name: "Automason", cost: 1000, growthRate: 50, numOwned: 0 },
];

//buttons for upgrades
for (const item of availableItems) {
  const button = document.createElement("button");
  button.innerHTML = `${item.name} (${item.cost.toFixed(1)} 🗿)`;
  button.disabled = true;
  button.onclick = () => {
    if (moyais >= item.cost) {
      moyais -= item.cost;
      item.cost *= 1.15;
      growthRate += item.growthRate;
      item.numOwned++;
    }
  }
  item.button = button;
  app.append(button);
}

const upgradeDisplay = document.createElement("div");
updateUpgradeDisplay();
app.append(upgradeDisplay);

function updateUpgradeDisplay() {
  let result = ``;
  for (const item of availableItems) {
    result += `${item.name}: ${item.numOwned}, `;
  }
  upgradeDisplay.innerHTML = result;
}

moyaiClick.onclick = () => {
  moyais++;
  counter.innerHTML = `${moyais.toFixed(1)} Moyais`;
};

requestAnimationFrame(tick);

function tick() {
  increaseMoyais();
  checkUpgrade();
  updateUI();
  requestAnimationFrame(tick);
}

function checkUpgrade() {
  for(const item of availableItems) {
    if (moyais >= item.cost) {
      item.button!.disabled = false;
    } else {
      item.button!.disabled = true;
    }
  }
}

let lastFrame = performance.now();
function increaseMoyais() {
  const deltaTime = (performance.now() - lastFrame) / 1000;
  lastFrame = performance.now();
  moyais += deltaTime * growthRate;
}

function updateUI() {
  counter.innerHTML = `${moyais.toFixed(1)} Moyais`;
  for (const item of availableItems) {
    item.button!.innerHTML = `${item.name} (${item.cost.toFixed(1)} 🗿)`;
  }
  growthRateDisplay.innerHTML = `${growthRate.toFixed(1)} Moyais per second`;
  updateUpgradeDisplay();
}
