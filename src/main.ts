import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "My soon to be amazing game";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

const button = document.createElement("button");
button.innerHTML = "🗿";
app.append(button);

const counter = document.createElement("div");
counter.innerHTML = `0 Moyais`;
app.append(counter);

let moyais: number = 0;

button.onclick = () => {
  moyais++;
  counter.innerHTML = `${moyais} Moyais`;
};

setInterval(increaseMoyais, 1000);

function increaseMoyais() {
  moyais++;
  counter.innerHTML = `${moyais} Moyais`;
}