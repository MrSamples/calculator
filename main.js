const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const decimal = document.querySelector(".decimal");
const clear = document.querySelector(".clear");
const backspace = document.querySelector(".backspace");
const equals = document.querySelector(".equals");
const screen = document.querySelector(".text");

let screenText = "0";
let ansPrinted = false;

function adder(num1, num2) {
    return num1 + num2;
};

function subtracter(num1, num2) {
    return num1 - num2;
};

function multiplier(num1, num2) {
    return num1 * num2;
};

function divider(num1, num2) {
    return num1 / num2;
}

/*const power = function(num1, num2) {
    return num1 ** num2;
};*/

//TODO: Implement negative number capabilities/features/compatibilities.
function equaler() {
    ansPrinted = true;

    let operatorIndex = screenText.search(/[\/\*\_\+]/);

    let num1 = parseFloat(screenText.substring(0, operatorIndex));
    let num2 = parseFloat(screenText.substring((operatorIndex + 1),
                          screenText.length));

    let answer;

    if (screenText.substring(operatorIndex, (operatorIndex + 1)) === "/") {
        answer = divider(num1, num2);
        screenText = answer.toString();
        screen.textContent = screenText;
        screen.scrollLeft = 0;
    }
    if (screenText.substring(operatorIndex, (operatorIndex + 1)) === "*") {
        answer = multiplier(num1, num2);
        screenText = answer.toString();
        screen.textContent = screenText;
        screen.scrollLeft = 0;
    }
    if (screenText.substring(operatorIndex, (operatorIndex + 1)) === "_") {
        answer = subtracter(num1, num2);
        screenText = answer.toString();
        screen.textContent = screenText;
        screen.scrollLeft = 0;
    }
    if (screenText.substring(operatorIndex, (operatorIndex + 1)) === "+") {
        answer = adder(num1, num2);
        screenText = answer.toString();
        screen.textContent = screenText;
        screen.scrollLeft = 0;
    }
}

function number(num) {
    if (ansPrinted == true) {
        ansPrinted = false;
        screenText = num;
        screen.textContent = screenText;
    }
    else if (screenText === "0") {
        screenText = num;
        screen.textContent = screenText;
    }
    else {
        screenText += num;
        screen.textContent = screenText.replace("_", "-");
        screen.scrollLeft = screen.scrollWidth;
    }
}

function decimaler() {
    ansPrinted = false;
    if (screenText.includes("/") ||
        screenText.includes("*") ||
        screenText.includes("_") ||
        screenText.includes("+")
    ) {
        let operatorIndex = screenText.search(/[\/\*\_\+]/);
        if (screenText.substring((operatorIndex + 1), screenText.length).includes("."))
            return;
    }
    else if (screenText.includes("."))
        return;
    
    screenText += ".";
    screen.textContent = screenText.replace("_", "-");
    screen.scrollLeft = screen.scrollWidth;
}

function operator(operator) {
    ansPrinted = false;
    if (screenText.includes("/") ||
        screenText.includes("*") ||
        screenText.includes("_") ||
        screenText.includes("+")
    ) {
        if ((screenText.search(/[\/\*\_\+]/) === (screenText.length - 1)) &&
            (operator === "-")
        ) {
            screenText += operator;
            screen.textContent = screenText.replace("_", "-");
            screen.scrollLeft = screen.scrollWidth;
        }
        return;
    }
    if (screenText.substring((screen.textContent.length - 1),
        screen.textContent.length) === ".")
        return;
    if (screenText === "0" && operator === "-") {
        screenText = operator;
        screen.textContent = screenText;
        return;
    }
    else if (operator === "-") {
        screenText += "_";
        screen.textContent = screenText.replace("_", "-");
        screen.scrollLeft = screen.scrollWidth;
        return;
    }
    screenText += operator;
    screen.textContent = screenText;
    screen.scrollLeft = screen.scrollWidth;
}

function clearer() {
    screenText = "0";
    screen.textContent = screenText;
}

function backspacer() {
    if (screenText.length === 1) {
        screenText = "0";
        screen.textContent = screenText;
        return;
    }
    screenText = screenText.substring(0, (screenText.length - 1));
    screen.textContent = screenText.replace("_", "-");
    screen.scrollLeft = screen.scrollWidth;
}

function deleter() {
    if (screenText.length === 1) {
        screenText = "0";
        screen.textContent = screenText;
        return;
    }
    screenText = screenText.substring(1, screenText.length);
    screen.textContent = screenText.replace("_", "-");
    screen.scrollLeft = 0;
}

numbers.forEach(num => num.addEventListener("click", function () { number(num.textContent); }));
operators.forEach(op => op.addEventListener("click", function () { operator(op.textContent); }));
decimal.addEventListener("click", function () { decimaler(); });
equals.addEventListener("click", function () { equaler(); });
backspace.addEventListener("click", function () { backspacer(); });
clear.addEventListener("click", function () { clearer(); });
//adds keyboard functionality
document.addEventListener("keydown", function (e) {
    const keyName = e.key;

    switch (keyName) {
        case "0":
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
            number(keyName);
            break;
        case "/":
        case "*":
        case "-":
        case "+":
            operator(keyName);
            break;
        case ".":
            decimaler();
            break;
        case "Enter":
            equaler();
            break;
        case "Backspace":
            backspacer();
            break;
        case "Delete":
            deleter();
            break;
        case "Escape":
            clearer();
            break;
    }
});
