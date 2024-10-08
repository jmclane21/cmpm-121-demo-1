import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "My soon to be amazing game";
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

const upgrade = document.createElement("button");
upgrade.innerHTML = `Upgrade`;
upgrade.disabled = true;
app.append(upgrade);

let moyais: number = 0;

moyaiClick.onclick = () => {
  moyais++;
  counter.innerHTML = `${moyais.toFixed(1)} Moyais`;
};

upgrade.onclick = () => {
  if (moyais >= 10) {
    moyais -= 10;
    growthRate += 0.1;
  }
};

let growthRate: number = 0.0;

requestAnimationFrame(tick);

function tick() {
  increaseMoyais();
  checkUpgrade();
  requestAnimationFrame(tick);
}

function checkUpgrade() {
  if (moyais >= 10) {
    upgrade.disabled = false;
  } else {
    upgrade.disabled = true;
  }
}

let lastFrame = performance.now();
function increaseMoyais() {
  const deltaTime = (performance.now() - lastFrame) / 1000;
  lastFrame = performance.now();
  moyais += deltaTime * growthRate;
  counter.innerHTML = `${moyais.toFixed(1)} Moyais`;
}
