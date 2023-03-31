const expressionBtns = document.querySelectorAll(".btn");
let display = document.getElementById("display") as HTMLInputElement;
const memorySaveBtn = document.querySelectorAll(".btn-top");
let memory: string[] = [];
var historyArray: string[] = [];
var currentValue: number;

const operators = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "0",
  "*(",
  ")",
  "+",
  "-",
  "*",
  "/",
  ".",
];

const operators2: string[] = ["+", "-", "*", "/"];
const numbers: string[] = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

let allowNum: boolean = false;
let dotCheck: boolean = false;
let checkDegree: boolean = false;
let checkSecondFun: boolean = false;
let checkOperator: boolean = false;
let bracketCount: number = 0;

function appendData(btnVal: any) {
  if (display.value === undefined) display.value = "0";
  if (Number(display.value) == 0) {
    if (btnVal !== display.value.includes(".")) {
      display.value = "";
    }
  }
  if (allowNum && isNaN(btnVal)) return;
  allowNum = false;
  if (operators.includes(btnVal)) {
    if (btnVal == ".") {
      if (dotCheck) return;
      else dotCheck = true;
    } else if (isNaN(btnVal)) {
      dotCheck = false;
    }

    if (operators2.includes(btnVal)) {
      if (display.value == "") {
        checkOperator = false;
        return;
      }
    } else {
      checkOperator = true;
    }
    if (btnVal === ")")
      if (!display.value.includes("*(") && !display.value.includes("(")) return;
    if (display.value === "" && btnVal === "*(") {
      display.value = "(";
      bracketCount++;
      return;
    }
    if (btnVal === "*(") {
      if (
        display.value.slice(-1) === "(" ||
        (display.value === "*(" && btnVal === "*(")
      ) {
        display.value += "(";
        bracketCount++;
        return;
      }
    }
    if (btnVal === "*(") {
      if (operators2.includes(display.value.slice(-1)) && btnVal === "*(") {
        display.value += "(";
        bracketCount++;
      } else {
        display.value += btnVal.toString();
        bracketCount++;
      }
    } else {
      if (operators2.includes(btnVal)) {
        if (checkOperator == false) return;
        display.value += btnVal.toString();
        checkOperator = false;
      } else {
        checkOperator == true;
        if (btnVal === ")") {
          if (bracketCount === 0) return;
          else {
            display.value += btnVal.toString();
            bracketCount--;
            return;
          }
        }
        display.value += btnVal.toString();
      }
    }
  }

  currentValue = Number(display.value);
  var check;
  switch (btnVal) {
    case "c":
      display.value = display.value.toString().slice(0, -1);
      break;
    case "ce":
      dotCheck = false;
      clear();
      break;
    case "=":
      checkOperator = true;
      saveHistory(display.value);
      calculate(display.value);
      saveHistory(display.value);
      break;
    case "mod":
      check = validateNumber();
      if (check === false) return display.value;
      display.value += "%";
      break;
    case "x²":
      check = validateNumber();
      if (check === false) return display.value;
      display.value = (currentValue * currentValue).toFixed().toString();
      break;
    case "x³":
      check = validateNumber();
      if (check === false) return display.value;
      display.value = (currentValue * currentValue * currentValue).toString();
      break;
    case "sqrt":
      check = validateNumber();
      if (check === false) return display.value;
      display.value = Math.sqrt(currentValue).toString();
      break;
    case "cbrt":
      check = validateNumber();
      if (check === false) return display.value;
      display.value = Math.cbrt(currentValue).toString();
      break;
    case "pi":
      display.value = Math.PI.toFixed(5).toString();
      break;
    case "fact":
      if (currentValue === 0) {
        return 1;
      } else {
        let fact = 1;
        for (let i = 1; i <= currentValue; i++) {
          fact *= i;
        }
        display.value = fact.toString();
      }
      break;
    case "1/x":
      check = validateNumber();
      if (check === false) return display.value;
      display.value = (1 / currentValue).toFixed(5).toString();
      break;
    case "abs":
      check = validateNumber();
      if (check === false) return display.value;
      display.value = Math.abs(currentValue).toString();
      break;
    case "tenx":
      check = validateNumber();
      if (check === false) return display.value;
      display.value = Math.pow(10, currentValue).toString();
      break;
    case "twox":
      check = validateNumber();
      if (check === false) return display.value;
      display.value = Math.pow(2, currentValue).toString();
      break;
    case "^":
      let val: number = Number(display.value.slice(-1));
      if (isNaN(val)) return display.value;
      display.value += "**";
      break;
    case "√":
      check = validateNumber();
      if (check === false) return display.value;
      display.value = Math.cbrt(currentValue).toString();
      break;
    case "log":
      check = validateNumber();
      if (check === false) return display.value;
      display.value = Math.log10(currentValue).toFixed(7).toString();
      break;
    case "logy":
      check = validateNumber();
      if (check === false) return display.value;
      display.value = Math.log2(currentValue).toFixed(7).toString();
      break;
    case "ln":
      check = validateNumber();
      if (check === false) return display.value;
      display.value = Math.log(currentValue).toFixed(7).toString();
      break;
    case "e":
      display.value = Math.E.toFixed(5).toString();
      break;
    case "ex":
      check = validateNumber();
      if (check === false) return display.value;
      display.value = Math.exp(currentValue).toFixed(5).toString();
      break;
    case "exp":
      if (isNaN(currentValue)) return;
      display.value = currentValue.toExponential().toString();
      break;
    case "sin":
      if (checkDegree === true) {
        display.value = Math.sin((currentValue * Math.PI) / 180).toString();
      } else {
        display.value = Math.sin(currentValue).toString();
      }
      break;
    case "cos":
      if (checkDegree === true) {
        display.value = Math.cos((currentValue * Math.PI) / 180).toString();
      } else {
        display.value = Math.cos(currentValue).toString();
      }
      break;
    case "tan":
      if (checkDegree === true) {
        display.value = Math.tan((currentValue * Math.PI) / 180).toString();
      } else {
        display.value = Math.tan(currentValue).toString();
      }
      break;
    case "rand":
      dotCheck = true;
      display.value = Math.random().toFixed(5).toString();
      break;
    case "minus":
      display.value = (currentValue * -1).toString();
      break;
    case "floor":
      display.value = Math.floor(currentValue).toString();
      break;
    case "ceil":
      display.value = Math.ceil(currentValue).toString();
      break;
    case "fe":
      display.value = Number(currentValue).toExponential();
      break;
    case "nd":
      secondfunction();
      break;
    case "deg":
      degFunction();
      break;
    default:
      break;
  }
}

function validateNumber() {
  let value = Number(display.value);
  if (isNaN(value)) return false;
  return true;
}

function chooseMemoryOperation(operation: any) {
  var lastVal;
  var currVal;
  var value = operation.toString();
  var result = localStorage.getItem("memory")!;
  if (result !== null) {
    let lastValue = result.split(",").slice(-1);
    lastVal = Number(lastValue);
    currVal = Number(currentValue);
  } else {
    lastVal = 0;
  }
  switch (value) {
    case "MS":
      memorySave();
      let buttonArray = Array.from(
        document.querySelectorAll(".mem")
      ) as HTMLButtonElement[];
      buttonArray.forEach((element) => {
        element.disabled = false;
      });
      break;
    case "MR":
      memoryRead();
      displayData();
      break;
    case "MC":
      localStorage.removeItem("memory");
      let btnArray = Array.from(
        document.querySelectorAll(".mem")
      ) as HTMLButtonElement[];
      btnArray.forEach((element) => {
        element.disabled = true;
      });
      break;
    case "M":
      memoryShow();
      break;
    case "M+":
      if (currVal == null) return;
      display.value = (lastVal + currVal).toString();
      displayData();
      break;
    case "M-":
      if (currVal == null) return;
      display.value = (lastVal - currVal).toString();
      displayData();
      break;
    case "His":
      showHistory();
      break;
    default:
      return;
  }
}

function memorySave() {
  let currMemVal = currentValue.toString();
  memory.push(currMemVal);
  localStorage.setItem("memory", memory.join(","));
}

function memoryRead() {
  let result = localStorage.getItem("memory") as string | null;
  if (result != null) {
    let stringVal: any = result.split(",").slice(-1);
    display.value = stringVal;
  } else {
    display.value = "";
  }
}

function memoryShow() {
  let memValue: string = localStorage.getItem("memory") as string;
  var content = "";
  if (memValue !== null) {
    memValue.split(",").map((element) => {
      content += `<div>${element}</div>\n`;
    });
    document.getElementById("memory")!.innerHTML = content;
  } else {
    document.getElementById("memory")!.innerHTML = content;
  }
}

function saveHistory(value: string) {
  let currHisVal: string = value.toString();
  historyArray.push(currHisVal);
  localStorage.setItem("history", historyArray.join(","));
}

function showHistory() {
  let hisValue: string = localStorage.getItem("history") as string;
  var content = "";
  let counter = 1;
  if (hisValue !== null) {
    hisValue.split(",").map((element) => {
      if (counter % 2 == 1) {
        content += `<div>${element} = </div> \n`;
        counter++;
      } else {
        content += `<div>${element}</div>`;
        counter++;
      }
    });
    document.getElementById("showHistory")!.innerHTML = content;
  } else {
    document.getElementById("showHistory")!.innerHTML = content;
  }
}

expressionBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    let btnVal: any = (e.target as any).value;
    appendData(btnVal);
    displayData();
  });
});

memorySaveBtn.forEach((button) => {
  button.addEventListener("click", (e) => {
    let result = (e.target as any).value;
    chooseMemoryOperation(result);
  });
});

window.onload = displayData;

function displayData(): void {
  if (display.value === "" || display.value === undefined) {
    display.innerText = "0";
  } else {
    display.innerText = display.value;
  }
}

function clear() {
  display.value = "0";
}

function calculate(current: any) {
  try {
    display.value = eval(current);
  } catch (e) {
    if (e instanceof SyntaxError) {
      display.value = "SyntaxError";
    }
  }
}

function secondfunction() {
  if (checkSecondFun === false) {
    checkSecondFun = true;
    secondfn();
    let changecolor = document.querySelector(".nd") as HTMLButtonElement;
    changecolor.style.setProperty("background-color", "#3469c1 ", "important");
  } else {
    checkSecondFun = false;
    secondfn();
    let secondfunBtn = document.querySelector(".nd") as HTMLButtonElement;
    secondfunBtn.style.setProperty("background-color", "#fff ", "important");
  }
}

function secondfn() {
  const secondFun = Array.from(
    document.querySelectorAll(".ndfun")
  ) as HTMLButtonElement[];
  const secondFn = Array.from(
    document.querySelectorAll(".secondfn")
  ) as HTMLButtonElement[];
  if (secondFun[0].style.display !== "none") {
    secondFun.forEach((element) => {
      element.style.setProperty("display", "none");
    });
    secondFn.forEach((element) => {
      element.style.setProperty("display", "inline-block", "important");
    });
  } else {
    secondFun.forEach((element) => {
      element.style.setProperty("display", "inline-block", "important");
    });
    secondFn.forEach((element) => {
      element.style.setProperty("display", "none");
    });
  }
}

function degFunction() {
  if (checkDegree === true) {
    checkDegree = false;
    let changecolor = document.querySelector(".degree") as HTMLButtonElement;
    changecolor.style.setProperty("background-color", "#f5f5f5 ", "important");
  } else {
    checkDegree = true;
    let changecolor = document.querySelector(".degree") as HTMLButtonElement;
    changecolor.style.setProperty("background-color", "#3469c1 ", "important");
  }
}

function removeHistory() {
  localStorage.removeItem("history");
  let closeBtn = document.querySelector("#close")! as HTMLButtonElement;
  closeBtn.click();
}

function removeMemory() {
  localStorage.removeItem("memory");
  let closeBtn = document.querySelector("#close-btn")! as HTMLButtonElement;
  closeBtn.click();
  let btnArray = Array.from(
    document.querySelectorAll(".mem")
  ) as HTMLButtonElement[];
  btnArray.forEach((element) => {
    element.disabled = true;
  });
}

(function memCheck() {
  let result = localStorage.getItem("memory") as string | null;
  if (result != null) {
    let btnArray = Array.from(
      document.querySelectorAll(".mem")
    ) as HTMLButtonElement[];
    btnArray.forEach((element) => {
      element.disabled = false;
    });
  }
})();
