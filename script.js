const numpad = document.querySelector(".numpad");
const zero = document.querySelector(".zero");
const display = document.querySelector(".display");
const backspace = document.querySelector(".backspace-button");
const clear = document.querySelector(".clear-button");
const ops = document.querySelectorAll(".next-step");
const solution = document.querySelector(".solution");
const problem = [];

backspace.addEventListener("click", function () {
  strLength = display.innerText.length;
  if (strLength === 1) {
    display.innerText = "0";
  } else {
    display.innerText = display.innerText.slice(0, strLength - 1);
  }
});

clear.addEventListener("click", function () {
  display.innerText = "0";
  problem.length = 0;
});

numpad.addEventListener("click", updateDisplay);
zero.addEventListener("click", updateDisplay);

function updateDisplay(event) {
  const number = event.target.innerText;
  if (display.innerText.length >= 12) {
    return;
  } else if (display.innerText !== "0") {
    display.innerText += number;
  } else {
    display.innerText = number;
  }
}

ops.forEach(function (i) {
  i.addEventListener("click", function (event) {
    if (display.innerText === "0") {
      return;
    }
    problem.push(display.innerText);
    problem.push(event.target.innerText);
    display.innerText = "0";
  });
});

solution.addEventListener("click", function () {
  if ("÷×-+".includes(problem[problem.length - 1])) {
    problem.push(display.innerText);
  }
  if (problem.length <= 2) {
    return;
  }
  multiply(problem);
  divide(problem);
  add(problem);
  subtract(problem);
  problem.length = 1;
  display.innerText = problem[0];
});

function multiply(arr) {
  while (arr.indexOf("×") !== -1) {
    i = arr.indexOf("×");
    arr[i - 1] = Number(arr[i - 1]) * Number(arr[i + 1]);
    arr.splice(i, 2);
  }
}

function divide(arr) {
  while (arr.indexOf("÷") !== -1) {
    i = arr.indexOf("÷");
    arr[i - 1] = Number(arr[i - 1]) / Number(arr[i + 1]);
    arr.splice(i, 2);
  }
}

function add(arr) {
  while (arr.indexOf("+") !== -1) {
    i = arr.indexOf("+");
    arr[i - 1] = Number(arr[i - 1]) + Number(arr[i + 1]);
    arr.splice(i, 2);
  }
}

function subtract(arr) {
  while (arr.indexOf("-") !== -1) {
    i = arr.indexOf("-");
    arr[i - 1] = Number(arr[i - 1]) - Number(arr[i + 1]);
    arr.splice(i, 2);
  }
}
