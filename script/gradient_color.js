document.querySelector("input[name='first'][type='text']").value = generateColor();
document.querySelector("input[name='second'][type='text']").value = generateColor();

document.querySelector("input[name='first'][type='color']").value = document.querySelector(
  "input[name='first'][type='text']"
).value;
document.querySelector("input[name='second'][type='color']").value = document.querySelector(
  "input[name='second'][type='text']"
).value;

showResult();

document.querySelector(".generate").addEventListener("click", function () {
  document.querySelector("input[name='first'][type='text']").value = generateColor();
  document.querySelector("input[name='second'][type='text']").value = generateColor();

  document.querySelector("input[name='first'][type='color']").value = document.querySelector(
    "input[name='first'][type='text']"
  ).value;
  document.querySelector("input[name='second'][type='color']").value = document.querySelector(
    "input[name='second'][type='text']"
  ).value;

  if (document.querySelector("select").value == "Linear") {
    document.querySelector("input[type='number']").value = Math.floor(Math.random() * 360);
  }
  showResult();
  new Notification(`Generated`).createObject();
});

document.addEventListener("keyup", function (event) {
  if (event.code === "Space") {
    document.querySelector("input[name='first'][type='text']").value = generateColor();
    document.querySelector("input[name='second'][type='text']").value = generateColor();

    document.querySelector("input[name='first'][type='color']").value = document.querySelector(
      "input[name='first'][type='text']"
    ).value;
    document.querySelector("input[name='second'][type='color']").value = document.querySelector(
      "input[name='second'][type='text']"
    ).value;

    if (document.querySelector("select").value == "Linear") {
      document.querySelector("input[type='number']").value = Math.floor(Math.random() * 360);
    }
    showResult();
    new Notification(`Generated`).createObject();
  }
});

document.querySelectorAll("input[type='text']").forEach((input) => {
  input.addEventListener("input", function (event) {
    event.target.value = `#${event.target.value.replace(/[^A-F0-9a-f]/g, "")}`;
    if (event.target.value.length == 7) {
      document.querySelector("input[name='first'][type='color']").value = document.querySelector(
        "input[name='first'][type='text']"
      ).value;
      document.querySelector("input[name='second'][type='color']").value = document.querySelector(
        "input[name='second'][type='text']"
      ).value;
      showResult();
    }
  });
});

document.querySelectorAll("input[type='color']").forEach((input) => {
  input.addEventListener("input", function () {
    document.querySelector("input[name='first'][type='text']").value = document.querySelector(
      "input[name='first'][type='color']"
    ).value;
    document.querySelector("input[name='second'][type='text']").value = document.querySelector(
      "input[name='second'][type='color']"
    ).value;

    showResult();
  });
});
document.querySelector("input[type='number']").addEventListener("click", showResult);
document.querySelector("select").addEventListener("click", showResult);

document.querySelector(".copy").addEventListener("click", copyToClipboard);

function showResult() {
  document.querySelector("select").value == "Linear"
    ? (document.querySelector(".gradient").style.background = `${document.querySelector("select").value}-gradient(${
        document.querySelector("input[type='number']").value
      }deg, ${document.querySelector("input[name='first'][type='color']").value}, ${
        document.querySelector("input[name='second'][type='color']").value
      })`)
    : (document.querySelector(".gradient").style.background = `${document.querySelector("select").value}-gradient(${
        document.querySelector("input[name='first'][type='color']").value
      }, ${document.querySelector("input[name='second'][type='color']").value})`);
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

  return `#${color[0][2]}${color[1][2]}${color[2][2]}`;
}
function copyToClipboard() {
  let copyText;
  document.querySelector("select").value == "Linear"
    ? (copyText = `background: ${document.querySelector("select").value}-gradient(${
        document.querySelector("input[type='number']").value
      }deg,${document.querySelector("input[name='first'][type='text']").value},${
        document.querySelector("input[name='second'][type='text']").value
      })`)
    : (copyText = `background: ${document.querySelector("select").value}-gradient(${
        document.querySelector("input[name='first'][type='text']").value
      },${document.querySelector("input[name='second'][type='text']").value})`);

  navigator.clipboard
    .writeText(copyText)
    .then(() => {
      new Notification(`Copied`).createObject();
    })
    .catch((err) => {
      console.error(err);
    });
}
