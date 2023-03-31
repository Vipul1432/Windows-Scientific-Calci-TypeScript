"use strict";
const expressionBtns = document.querySelectorAll(".btn");
let display = document.getElementById("display");
const memorySaveBtn = document.querySelectorAll(".btn-top");
let memory = [];
var historyArray = [];
var currentValue;
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
const operators2 = ["+", "-", "*", "/"];
const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
let allowNum = false;
let dotCheck = false;
let checkDegree = false;
let checkSecondFun = false;
let checkOperator = false;
function appendData(btnVal) {
    if (display.value === undefined)
        display.value = "0";
    if (Number(display.value) == 0) {
        if (btnVal !== display.value.includes(".")) {
            display.value = "";
        }
    }
    if (allowNum && isNaN(btnVal))
        return;
    allowNum = false;
    if (operators.includes(btnVal)) {
        if (btnVal == ".") {
            if (dotCheck)
                return;
            else
                dotCheck = true;
        }
        else if (isNaN(btnVal)) {
            dotCheck = false;
        }
        if (operators2.includes(btnVal)) {
            if (display.value == "") {
                checkOperator = false;
                return;
            }
        }
        else {
            checkOperator = true;
        }
        if (btnVal === ")")
            if (!display.value.includes("*(") && !display.value.includes("("))
                return;
        if (display.value === "" && btnVal === "*(") {
            display.value = "(";
            return;
        }
        if (btnVal === "*(") {
            if (operators2.includes(display.value.slice(-1)) && btnVal === "*(") {
                display.value += "(";
            }
            else
                display.value += btnVal.toString();
        }
        else {
            if (operators2.includes(btnVal)) {
                if (checkOperator == false)
                    return;
                display.value += btnVal.toString();
                checkOperator = false;
            }
            else {
                checkOperator == true;
                display.value += btnVal.toString();
            }
        }
    }
    currentValue = Number(display.value);
    switch (btnVal) {
        case "c":
            display.value = display.value.toString().slice(0, -1);
            break;
        case "ce":
            clear();
            break;
        case "=":
            checkOperator = true;
            saveHistory(display.value);
            calculate(display.value);
            saveHistory(display.value);
            break;
        case "mod":
            display.value += "%";
            break;
        case "x²":
            display.value = (currentValue * currentValue).toFixed().toString();
            break;
        case "x³":
            display.value = (currentValue * currentValue * currentValue).toString();
            break;
        case "sqrt":
            display.value = Math.sqrt(currentValue).toString();
            break;
        case "cbrt":
            display.value = Math.cbrt(currentValue).toString();
            break;
        case "pi":
            display.value = Math.PI.toFixed(5).toString();
            break;
        case "fact":
            if (currentValue === 0) {
                return 1;
            }
            else {
                let fact = 1;
                for (let i = 1; i <= currentValue; i++) {
                    fact *= i;
                }
                display.value = fact.toString();
            }
            break;
        case "1/x":
            display.value = (1 / currentValue).toFixed(5).toString();
            break;
        case "abs":
            display.value = Math.abs(currentValue).toString();
            break;
        case "tenx":
            display.value = Math.pow(10, currentValue).toString();
            break;
        case "twox":
            display.value = Math.pow(2, currentValue).toString();
            break;
        case "^":
            display.value += "**";
            break;
        case "√":
            display.value = Math.cbrt(currentValue).toString();
            break;
        case "log":
            display.value = Math.log10(currentValue).toFixed(7).toString();
            break;
        case "logy":
            display.value = Math.log2(currentValue).toFixed(7).toString();
            break;
        case "ln":
            display.value = Math.log(currentValue).toFixed(7).toString();
            break;
        case "e":
            display.value = Math.E.toFixed(5).toString();
            break;
        case "ex":
            display.value = Math.exp(currentValue).toFixed(5).toString();
            break;
        case "exp":
            if (isNaN(currentValue))
                return;
            display.value = Math.exp(currentValue).toFixed(5).toString();
            break;
        case "sin":
            if (checkDegree === true) {
                display.value = Math.sin((currentValue * Math.PI) / 180).toString();
            }
            else {
                display.value = Math.sin(currentValue).toString();
            }
            break;
        case "cos":
            if (checkDegree === true) {
                display.value = Math.cos((currentValue * Math.PI) / 180).toString();
            }
            else {
                display.value = Math.cos(currentValue).toString();
            }
            break;
        case "tan":
            if (checkDegree === true) {
                display.value = Math.tan((currentValue * Math.PI) / 180).toString();
            }
            else {
                display.value = Math.tan(currentValue).toString();
            }
            break;
        case "rand":
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
function chooseMemoryOperation(operation) {
    var lastVal;
    var currVal;
    var value = operation.toString();
    var result = localStorage.getItem("memory");
    if (result !== null) {
        let lastValue = result.split(",").slice(-1);
        lastVal = Number(lastValue);
        currVal = Number(currentValue);
    }
    else {
        lastVal = 0;
    }
    switch (value) {
        case "MS":
            memorySave();
            let buttonArray = Array.from(document.querySelectorAll(".mem"));
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
            let btnArray = Array.from(document.querySelectorAll(".mem"));
            btnArray.forEach((element) => {
                element.disabled = true;
            });
            break;
        case "M":
            memoryShow();
            break;
        case "M+":
            if (currVal == null)
                return;
            display.value = (lastVal + currVal).toString();
            displayData();
            break;
        case "M-":
            if (currVal == null)
                return;
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
    let result = localStorage.getItem("memory");
    if (result != null) {
        let stringVal = result.split(",").slice(-1);
        display.value = stringVal;
    }
    else {
        display.value = "";
    }
}
function memoryShow() {
    let memValue = localStorage.getItem("memory");
    var content = "";
    if (memValue !== null) {
        memValue.split(",").map((element) => {
            content += `<div>${element}</div>\n`;
        });
        document.getElementById("memory").innerHTML = content;
    }
    else {
        document.getElementById("memory").innerHTML = content;
    }
}
function saveHistory(value) {
    let currHisVal = value.toString();
    historyArray.push(currHisVal);
    localStorage.setItem("history", historyArray.join(","));
}
function showHistory() {
    let hisValue = localStorage.getItem("history");
    var content = "";
    let counter = 1;
    if (hisValue !== null) {
        hisValue.split(",").map((element) => {
            if (counter % 2 == 1) {
                content += `<div>${element} = </div> \n`;
                counter++;
            }
            else {
                content += `<div>${element}</div>`;
                counter++;
            }
        });
        document.getElementById("showHistory").innerHTML = content;
    }
    else {
        document.getElementById("showHistory").innerHTML = content;
    }
}
expressionBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        let btnVal = e.target.value;
        appendData(btnVal);
        displayData();
    });
});
memorySaveBtn.forEach((button) => {
    button.addEventListener("click", (e) => {
        let result = e.target.value;
        chooseMemoryOperation(result);
    });
});
window.onload = displayData;
function displayData() {
    if (display.value === "" || display.value === undefined) {
        display.innerText = "0";
    }
    else {
        display.innerText = display.value;
    }
}
function clear() {
    display.value = "0";
}
function calculate(current) {
    display.value = eval(current);
}
function secondfunction() {
    if (checkSecondFun === false) {
        checkSecondFun = true;
        secondfn();
        let changecolor = document.querySelector(".nd");
        changecolor.style.setProperty("background-color", "#3469c1 ", "important");
    }
    else {
        checkSecondFun = false;
        secondfn();
        let secondfunBtn = document.querySelector(".nd");
        secondfunBtn.style.setProperty("background-color", "#fff ", "important");
    }
}
function secondfn() {
    const secondFun = Array.from(document.querySelectorAll(".ndfun"));
    const secondFn = Array.from(document.querySelectorAll(".secondfn"));
    if (secondFun[0].style.display !== "none") {
        secondFun.forEach((element) => {
            element.style.setProperty("display", "none");
        });
        secondFn.forEach((element) => {
            element.style.setProperty("display", "inline-block", "important");
        });
    }
    else {
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
        let changecolor = document.querySelector(".degree");
        changecolor.style.setProperty("background-color", "#f5f5f5 ", "important");
    }
    else {
        checkDegree = true;
        let changecolor = document.querySelector(".degree");
        changecolor.style.setProperty("background-color", "#3469c1 ", "important");
    }
}
function removeHistory() {
    localStorage.removeItem("history");
    let closeBtn = document.querySelector("#close");
    closeBtn.click();
}
function removeMemory() {
    localStorage.removeItem("memory");
    let closeBtn = document.querySelector("#close-btn");
    closeBtn.click();
}
