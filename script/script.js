generateColor();

document.querySelector("button").addEventListener("click", generateColor);
document.addEventListener("keydown", function (event) {
  if (event.code === "Space") {
    generateColor();
  }
});

function generateColor() {
  let color = [
    [0, 0, 0], //R
    [0, 0, 0], //G
    [0, 0, 0], //B
  ];
  let max = 16;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 2; j++) {
      color[i][j] = Math.floor(Math.random() * max);
      color[i][2] += color[i][j] * Math.pow(16, Math.abs(j - 1));
    }
    color[i][2] = color[i][2].toString(16).padStart(2, "0");
  }
  showColor(`${color[0][2]}${color[1][2]}${color[2][2]}`);
}
function showColor(result) {
  let card = document.querySelector(".card");
  card.style.background = `#${result}`;
  fetchData(result);
}
async function fetchData(hex) {
  try {
    const response = await fetch(`https://www.thecolorapi.com/id?hex=${hex}`);
    if (!response.ok) {
      throw new Error("Could not fetch resource");
    }
    const data = await response.json();
    document.querySelector(".hex").innerHTML = `HEX: #${hex}`;
    document.querySelector(".rgb").innerHTML = `RGB: ${data.rgb.value}`;
    document.querySelector(".hsl").innerHTML = `HSL: ${data.hsl.value}`;
    document.querySelector(".hsv").innerHTML = `HSV: ${data.hsv.value}`;
    document.querySelector(".cmyk").innerHTML = `CMYK: ${data.cmyk.value}`;
    document.querySelector(".name span").innerHTML = data.name.value;
  } catch (error) {
    console.error(error);
  }
}
