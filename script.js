// Elementos DOM
const buttons = document.querySelectorAll(".flavor-btn");
const desc = document.getElementById("main-description");
const tag = document.getElementById("flavor-tag");
const accent = document.getElementById("can-accent");
const glow = document.getElementById("glow-effect");
const bar = document.getElementById("energy-bar");
const valText = document.getElementById("energy-value");
const chargeBtn = document.getElementById("btn-charge");
const root = document.documentElement;

// Configurações dos sabores
const flavors = {
  lime: {
    tag: "Edição Limitada",
    color: "#ccff00",
    desc: "A força cítrica que você precisa para virar a noite no código ou no jogo.",
  },
  berry: {
    tag: "Edição Original",
    color: "#ff006e",
    desc: "Um mix de frutas vermelhas com o dobro de taurina para máxima performance.",
  },
  ice: {
    tag: "Refrescância Extrema",
    color: "#00d4ff",
    desc: "Sinta o choque térmico. Foco frio e calculista para momentos de alta pressão.",
  },
};

// Estado da energia
let energyLevel = 0;

// Função para trocar o sabor
function switchFlavor(key) {
  const data = flavors[key];

  tag.textContent = data.tag;
  desc.textContent = data.desc;

  root.style.setProperty("--primary-color", data.color);
  accent.setAttribute("fill", data.color);
  glow.style.backgroundColor = data.color;

  buttons.forEach((b) => b.classList.remove("active"));
  document.querySelector(`[data-flavor="${key}"]`).classList.add("active");

  resetEnergy();
}

// Função para atualizar a barra de energia
function updateEnergy() {
  if (energyLevel < 100) {
    energyLevel += 10;
    bar.style.width = energyLevel + "%";
    valText.textContent = energyLevel + "%";

    if (energyLevel === 100) {
      valText.textContent = "CARGA MÁXIMA!";
      chargeBtn.style.backgroundColor = "var(--primary-color)";
      chargeBtn.style.color = "black";
    }
  }
}

// Função para resetar a energia
function resetEnergy() {
  energyLevel = 0;
  bar.style.width = "0%";
  valText.textContent = "0%";
  chargeBtn.style.backgroundColor = "transparent";
  chargeBtn.style.color = "white";
}

// Event listeners para os botões de sabor
buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const flavor = btn.getAttribute("data-flavor");
    switchFlavor(flavor);
  });
});

// Event listener para o botão de carga
if (chargeBtn) {
  chargeBtn.addEventListener("click", updateEnergy);
}

// Inicialização
document.addEventListener("DOMContentLoaded", () => {
  // Garantir que a cor inicial está correta
  const initialColor = flavors.berry.color;
  root.style.setProperty("--primary-color", initialColor);
  accent.setAttribute("fill", initialColor);
  glow.style.backgroundColor = initialColor;
});
