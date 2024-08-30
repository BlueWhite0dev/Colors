generateColor();
let isActive = false;
document.querySelector(".generate").addEventListener("click", function () {
  if (isActive == false) {
    new Notification(`Generated`).createObject();
    isActive = true;
    document.querySelector(".card").classList.add("animation");
    setTimeout(generateColor, 1000);
  }
});
document.addEventListener("keyup", function (event) {
  if (event.code === "Space" && isActive == false) {
    new Notification(`Generated`).createObject();
    isActive = true;
    document.querySelector(".card").classList.add("animation");
    setTimeout(generateColor, 1000);
  }
});
function removeClass() {
  document.querySelector(".card").classList.remove("animation");
}
function generateColor() {
  let color = [
    [0, 0, 0, 0], //R
    [0, 0, 0, 0], //G
    [0, 0, 0, 0], //B
  ];
  let max = 16;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 2; j++) {
      color[i][j] = Math.floor(Math.random() * max);
      color[i][2] += color[i][j] * Math.pow(max, Math.abs(j - 1));
    }
    color[i][3] = color[i][2];
    color[i][2] = color[i][2].toString(16).padStart(2, "0");
  }
  showColor(`${color[0][2]}${color[1][2]}${color[2][2]}`);
  let color_contrast = ["#fafafa", "#0b1215"];
  checkLuminance(color[0][3], color[1][3], color[2][3])
    ? (function () {
        document.querySelector(
          ".card"
        ).style.background = `linear-gradient(225deg, #${color[0][2]}${color[1][2]}${color[2][2]} , ${color_contrast[0]})`;
        document.querySelectorAll("span").forEach(function (span) {
          span.style.color = color_contrast[1];
        });
        document.querySelector("path").style.fill = color_contrast[1];
      })()
    : (function () {
        document.querySelector(
          ".card"
        ).style.background = `linear-gradient(225deg, #${color[0][2]}${color[1][2]}${color[2][2]} , ${color_contrast[1]})`;
        document.querySelectorAll("span").forEach(function (span) {
          span.style.color = color_contrast[0];
        });
        document.querySelector("path").style.fill = color_contrast[0];
      })();
  setTimeout(function () {
    isActive = false;
  }, 1000);
}
function checkLuminance(red, green, blue) {
  let luminance =
    0.299 * parseInt(red.toString(10)) + 0.587 * parseInt(green.toString(10)) + 0.114 * parseInt(blue.toString(10));
  return luminance > 128 ? true : false; // if luminance > 128 => black, else white
}

function showColor(result) {
  let card = document.querySelector(".header");
  card.style.background = `#${result}`;
  fetchData(result);
  setTimeout(removeClass, 1000);
}
async function fetchData(hex) {
  try {
    const response = await fetch(`https://www.thecolorapi.com/id?hex=${hex}`);
    if (!response.ok) {
      throw new Error("Could not fetch resource");
    }
    const data = await response.json();
    document.querySelector(".hex span").innerHTML = `HEX: #${hex}`;
    document.querySelector(".rgb span").innerHTML = `RGB: ${data.rgb.value}`;
    document.querySelector(".hsl span").innerHTML = `HSL: ${data.hsl.value}`;
    document.querySelector(".hsv span").innerHTML = `HSV: ${data.hsv.value}`;
    document.querySelector(".cmyk span").innerHTML = `CMYK: ${data.cmyk.value}`;
    document.querySelector(".name span").innerHTML = data.name.value;
  } catch (error) {
    console.error(error);
  }
}
function copyToClipboard(number) {
  let copyText = document.querySelectorAll("span")[number].textContent;
  if (number >= 1 && number < 5) {
    copyText = copyText.slice(5);
  } else if (number == 5) {
    copyText = copyText.slice(6);
  }

  navigator.clipboard
    .writeText(copyText)
    .then(() => {
      new Notification(`Copied: ${copyText}`).createObject();
    })
    .catch((err) => {
      console.error(err);
    });
}
