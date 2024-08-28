let luminance = [0, 0];
quoteAPI();

document.querySelector("input[name='text']").value = generateColor();
document.querySelector("input[name='bg']").value = generateColor();
document.querySelector("input[name='text_c']").value = document.querySelector("input[name='text']").value;
document.querySelector("input[name='bg_c']").value = document.querySelector("input[name='bg']").value;
document.querySelectorAll(".bg")[0].innerHTML = `${calcLuminance()}:1`;

checkAccessibility(document.querySelectorAll(".bg")[0].innerHTML);
showResult(document.querySelector("input[name='text_c']").value, document.querySelector("input[name='bg_c']").value);

document.addEventListener("keyup", function (event) {
  if (event.code === "Space") {
    document.querySelector("input[name='text']").value = generateColor();
    document.querySelector("input[name='bg']").value = generateColor();
    document.querySelector("input[name='text_c']").value = document.querySelector("input[name='text']").value;
    document.querySelector("input[name='bg_c']").value = document.querySelector("input[name='bg']").value;
    document.querySelectorAll(".bg")[0].innerHTML = `${calcLuminance()}:1`;

    checkAccessibility(document.querySelectorAll(".bg")[0].innerHTML);
    showResult(document.querySelector("input[name='text_c']").value, document.querySelector("input[name='bg_c']").value);
  }
});

document.querySelectorAll("input[type='text']").forEach((input) => {
  input.addEventListener("input", function (event) {
    event.target.value = `#${event.target.value.replace(/[^A-F0-9a-f]/g, "")}`;
    if (event.target.value.length == 7) {
      document.querySelector("input[name='text_c']").value = document.querySelector("input[name='text']").value;
      document.querySelector("input[name='bg_c']").value = document.querySelector("input[name='bg']").value;
      document.querySelectorAll(".bg")[0].innerHTML = `${calcLuminance()}:1`;
      checkAccessibility(document.querySelectorAll(".bg")[0].innerHTML);
      showResult(document.querySelector("input[name='text_c']").value, document.querySelector("input[name='bg_c']").value);
    }
  });
});

document.querySelectorAll("input[type='color']").forEach((input) => {
  input.addEventListener("input", function () {
    document.querySelector("input[name='text']").value = document.querySelector("input[name='text_c']").value;
    document.querySelector("input[name='bg']").value = document.querySelector("input[name='bg_c']").value;
    document.querySelectorAll(".bg")[0].innerHTML = `${calcLuminance()}:1`;
    checkAccessibility(document.querySelectorAll(".bg")[0].innerHTML);
    showResult(document.querySelector("input[name='text_c']").value, document.querySelector("input[name='bg_c']").value);
  });
});

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

  return `#${color[0][2]}${color[1][2]}${color[2][2]}`;
}

async function quoteAPI() {
  try {
    const response = await fetch("https://dummyjson.com/quotes/random");
    if (!response.ok) {
      throw new Error("Could not fetch resource");
    }
    const data = await response.json();
    document.querySelector(".quote").innerHTML = data.quote;
    document.querySelector(".author").innerHTML = data.author;
  } catch (error) {
    console.error(error);
  }
}

function calcLuminance() {
  let rgb = [0, 0, 0];

  for (let i = 0; i < 2; i++) {
    let color = document.querySelectorAll("input[type='color']")[i].value.replace(/^#/, "");
    for (let j = 0; j < 3; j++) {
      rgb[j] = parseInt(parseInt(color.substring(2 * j, 2 * j + 2), 16)) / 255;
      if (rgb[j] <= 0.03928) {
        rgb[j] = rgb[j] / 12.92;
      } else {
        rgb[j] = Math.pow((rgb[j] + 0.055) / 1.055, 2.4);
      }
    }
    luminance[i] = 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];
  }
  //Lighter > darker
  if (luminance[1] > luminance[0]) {
    return parseFloat((luminance[1] + 0.05) / (luminance[0] + 0.05))
      .toFixed(1)
      .endsWith(".0")
      ? Math.round((luminance[1] + 0.05) / (luminance[0] + 0.05))
      : parseFloat((luminance[1] + 0.05) / (luminance[0] + 0.05)).toFixed(1);
  } else {
    return parseFloat((luminance[0] + 0.05) / (luminance[1] + 0.05))
      .toFixed(1)
      .endsWith(".0")
      ? Math.round((luminance[0] + 0.05) / (luminance[1] + 0.05))
      : parseFloat((luminance[0] + 0.05) / (luminance[1] + 0.05)).toFixed(1);
  }
}
function checkAccessibility(CR) {
  let accesibility = document.querySelectorAll(".accesibility");
  let color = ["#15803d", "#dc2626"];
  for (let i = 0; i < 5; i++) {
    switch (i) {
      case 0: {
        parseFloat(CR.slice(0, -2)) >= 7
          ? (function () {
              accesibility[i].style.background = color[0];
            })()
          : (function () {
              accesibility[i].style.background = color[1];
            })();
        break;
      }
      case 1: {
        parseFloat(CR.slice(0, -2)) >= 4.5
          ? (function () {
              document.querySelectorAll(".card img")[i - 1].src = "./img/success.svg";
              accesibility[i].style.background = color[0];
            })()
          : (function () {
              document.querySelectorAll(".card img")[i - 1].src = "./img/alarm.svg";
              accesibility[i].style.background = color[1];
            })();
        break;
      }
      case 2: {
        parseFloat(CR.slice(0, -2)) >= 3
          ? (function () {
              document.querySelectorAll(".card img")[i - 1].src = "./img/success.svg";
              accesibility[i].style.background = color[0];
            })()
          : (function () {
              document.querySelectorAll(".card img")[i - 1].src = "./img/alarm.svg";
              accesibility[i].style.background = color[1];
            })();
        break;
      }
      case 3: {
        parseFloat(CR.slice(0, -2)) >= 7
          ? (function () {
              document.querySelectorAll(".card img")[i - 1].src = "./img/success.svg";
              accesibility[i].style.background = color[0];
            })()
          : (function () {
              document.querySelectorAll(".card img")[i - 1].src = "./img/alarm.svg";
              accesibility[i].style.background = color[1];
            })();
        break;
      }
      case 4: {
        parseFloat(CR.slice(0, -2)) >= 4.5
          ? (function () {
              document.querySelectorAll(".card img")[i - 1].src = "./img/success.svg";
              accesibility[i].style.background = color[0];
            })()
          : (function () {
              document.querySelectorAll(".card img")[i - 1].src = "./img/alarm.svg";
              accesibility[i].style.background = color[1];
            })();
        break;
      }
    }
  }
}
function showResult(text, background) {
  document.querySelector(".result_card").style.background = background;
  document.querySelectorAll("g")[1].style.fill = text;
  document.querySelector(".large").style.color = text;
  document.querySelector(".quote").style.color = text;
  document.querySelector(".author").style.color = text;
}
