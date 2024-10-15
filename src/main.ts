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

//buttons for upgrades

const quarry = document.createElement("button");
quarry.innerHTML = `Stone Quarry (10 🗿)`;
quarry.disabled = true;
app.append(quarry);

const sculptor = document.createElement("button");
sculptor.innerHTML = `Sculptor (100 🗿)`;
sculptor.disabled = true;
app.append(sculptor);

const upgrade3 = document.createElement("button");
upgrade3.innerHTML = `Upgrade 3 (1000 🗿)`;
upgrade3.disabled = true;
app.append(upgrade3);

const upgradeDisplay = document.createElement("div");
upgradeDisplay.innerHTML = `Stone Quarries: ${upgradeDictionary.quarry}, 
Sculptors: ${upgradeDictionary.sculptor}, Upgrade 3: ${upgradeDictionary.upgrade3}`;
app.append(upgradeDisplay);

let moyais: number = 1000;

moyaiClick.onclick = () => {
  moyais++;
  counter.innerHTML = `${moyais.toFixed(1)} Moyais`;
};

quarry.onclick = () => {
  if (moyais >= 10) {
    moyais -= 10;
    growthRate += 0.1;
    upgradeDictionary.quarry++;
    updateUI()
  }
};

sculptor.onclick = () => {
  if (moyais >= 100) {
    moyais -= 100;
    growthRate += 2;
    upgradeDictionary.sculptor++;
    updateUI()
  }
};

upgrade3.onclick = () => {
  if (moyais >= 1000) {
    moyais -= 1000;
    growthRate += 50;
    upgradeDictionary.upgrade3++;
    updateUI()
  }
}

requestAnimationFrame(tick);

function tick() {
  increaseMoyais();
  checkUpgrade();
  requestAnimationFrame(tick);
}

function checkUpgrade() {
  if (moyais >= 1000) {
    upgrade3.disabled = false;
  } else {
    upgrade3.disabled = true;
  }
  if (moyais >= 100) {
    sculptor.disabled = false;
  } else {
    sculptor.disabled = true;
  }
  if (moyais >= 10) {
    quarry.disabled = false;
  } else {
    quarry.disabled = true;
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
  growthRateDisplay.innerHTML = `${growthRate.toFixed(1)} Moyais per second`;
  upgradeDisplay.innerHTML = `Stone Quarries: ${upgradeDictionary.quarry}, 
Sculptors: ${upgradeDictionary.sculptor}, Upgrade 3: ${upgradeDictionary.upgrade3}`;
}
