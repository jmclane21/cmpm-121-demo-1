import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

let growthRate: number = 0.0;
let moyais: number = 0;

const gameName = "Easter Island Generator";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

const moyaiClick = document.createElement("h2");
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
  description: string;
  button?: HTMLButtonElement;
}

const availableItems: Item[] = [
  {
    name: "Stone Quarry",
    cost: 10,
    growthRate: 0.1,
    numOwned: 0,
    description: "Mines stone, produces 0.1 Moyai/sec",
  },
  {
    name: "Sculptor",
    cost: 100,
    growthRate: 2,
    numOwned: 0,
    description: "Professional Moyai sculptor, produces 2 Moyai/sec",
  },
  {
    name: "Automason",
    cost: 1000,
    growthRate: 50,
    numOwned: 0,
    description: "Automated quarry and sculptor, produces 50 Moyai/sec",
  },
  {
    name: "Moyai Cloner",
    cost: 10000,
    growthRate: 1000,
    numOwned: 0,
    description: "A large Moyai cloner, produces 1000 Moyai/sec",
  },
  {
    name: "Moyai Paradox",
    cost: 100000,
    growthRate: 10000,
    numOwned: 0,
    description:
      "Send Moyai back in time to create the original Moai, produces 10000 Moyai/sec",
  },
];

const costGrowthRate: number = 1.15;

//buttons for upgrades
for (const item of availableItems) {
  const button = document.createElement("button");
  button.innerHTML = `${item.name} (${item.cost.toFixed(1)} 🗿)`;
  button.disabled = true;
  button.onclick = () => {
    if (moyais >= item.cost) {
      moyais -= item.cost;
      item.cost *= costGrowthRate;
      growthRate += item.growthRate;
      item.numOwned++;
    }
  };
  button.title = item.description;
  item.button = button;
  app.append(button);
}

const upgradeDisplay = document.createElement("div");
updateUpgradeDisplay();
app.append(upgradeDisplay);

function updateUpgradeDisplay() {
  let result = ``;
  for (const item of availableItems) {
    result += `${item.name}: ${item.numOwned} `;
  }
  upgradeDisplay.innerHTML = result;
}

//inspired by https://github.com/rozy-dixon/cmpm-121-demo-1/blob/main/src/style.css
moyaiClick.addEventListener('click', (event) => {
  event.stopPropagation();
  moyais++;
  counter.innerHTML = `${moyais.toFixed(1)} Moyais`;
  moyaiClick.classList.remove('wiggle');
  void moyaiClick.offsetWidth;
  moyaiClick.classList.add('wiggle');
});

requestAnimationFrame(tick);

function tick() {
  increaseMoyais();
  checkUpgrade();
  updateUI();
  requestAnimationFrame(tick);
}

function checkUpgrade() {
  for (const item of availableItems) {
    if (item.button) {
      if (moyais >= item.cost) {
        item.button.disabled = false;
      } else {
        item.button.disabled = true;
      }
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
    if (item.button) {
      item.button.innerHTML = `${item.name} (${item.cost.toFixed(1)} 🗿)`;
    }
  }
  growthRateDisplay.innerHTML = `${growthRate.toFixed(1)} Moyais per second`;
  updateUpgradeDisplay();
}
