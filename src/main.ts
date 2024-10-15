import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

let growthRate: number = 0.0;
const upgradeDictionary = {
  quarry: 0,
  sculptor: 0,
  upgrade3: 0,
};

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

interface Upgrade {
  name: string;
  cost: number;
  growthRate: number;
}

//buttons for upgrades
const quarry: Upgrade = {
  name: "Stone Quarry",
  cost: 10,
  growthRate: 0.1,
};

const sculptor: Upgrade = {
  name: "Sculptor",
  cost: 100,
  growthRate: 2,
};

const upgrade3: Upgrade = {
  name: "Upgrade 3",
  cost: 1000,
  growthRate: 50,
};

const quarryButton = document.createElement("button");
quarryButton.innerHTML = `Stone Quarry (${quarry.cost.toFixed(2)} 🗿)`;
quarryButton.disabled = true;
app.append(quarryButton);

const sculptorButton = document.createElement("button");
sculptorButton.innerHTML = `Sculptor (${sculptor.cost.toFixed(2)} 🗿)`;
sculptorButton.disabled = true;
app.append(sculptorButton);

const upgrade3Button = document.createElement("button");
upgrade3Button.innerHTML = `Upgrade 3 (${upgrade3.cost.toFixed(2)} 🗿)`;
upgrade3Button.disabled = true;
app.append(upgrade3Button);

const upgradeDisplay = document.createElement("div");
upgradeDisplay.innerHTML = `Stone Quarries: ${upgradeDictionary.quarry}, 
Sculptors: ${upgradeDictionary.sculptor}, Upgrade 3: ${upgradeDictionary.upgrade3}`;
app.append(upgradeDisplay);

let moyais: number = 1000;

moyaiClick.onclick = () => {
  moyais++;
  counter.innerHTML = `${moyais.toFixed(1)} Moyais`;
};

quarryButton.onclick = () => {
  if (moyais >= quarry.cost) {
    moyais -= quarry.cost;
    quarry.cost *= 1.15;
    growthRate += 0.1;
    upgradeDictionary.quarry++;
    updateUI();
  }
};

sculptorButton.onclick = () => {
  if (moyais >= sculptor.cost) {
    moyais -= sculptor.cost;
    sculptor.cost *= 1.15;
    growthRate += 2;
    upgradeDictionary.sculptor++;
    updateUI();
  }
};

upgrade3Button.onclick = () => {
  if (moyais >= upgrade3.cost) {
    moyais -= upgrade3.cost;
    upgrade3.cost *= 1.15;
    growthRate += 50;
    upgradeDictionary.upgrade3++;
    updateUI();
  }
};

requestAnimationFrame(tick);

function tick() {
  increaseMoyais();
  checkUpgrade();
  requestAnimationFrame(tick);
}

function checkUpgrade() {
  if (moyais >= upgrade3.cost) {
    upgrade3Button.disabled = false;
  } else {
    upgrade3Button.disabled = true;
  }
  if (moyais >= sculptor.cost) {
    sculptorButton.disabled = false;
  } else {
    sculptorButton.disabled = true;
  }
  if (moyais >= quarry.cost) {
    quarryButton.disabled = false;
  } else {
    quarryButton.disabled = true;
  }
}

let lastFrame = performance.now();
function increaseMoyais() {
  const deltaTime = (performance.now() - lastFrame) / 1000;
  lastFrame = performance.now();
  moyais += deltaTime * growthRate;
  counter.innerHTML = `${moyais.toFixed(1)} Moyais`;
}

function updateUI() {
  quarryButton.innerHTML = `Stone Quarry (${quarry.cost.toFixed(2)} 🗿)`;
  sculptorButton.innerHTML = `Sculptor (${sculptor.cost.toFixed(2)} 🗿)`;
  upgrade3Button.innerHTML = `Upgrade 3 (${upgrade3.cost.toFixed(2)} 🗿)`;
  growthRateDisplay.innerHTML = `${growthRate.toFixed(1)} Moyais per second`;
  upgradeDisplay.innerHTML = `Stone Quarries: ${upgradeDictionary.quarry}, 
Sculptors: ${upgradeDictionary.sculptor}, Upgrade 3: ${upgradeDictionary.upgrade3}`;
}
