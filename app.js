const calculatorDisplay = document.querySelector('h1');
const inputButtons = document.querySelectorAll('button');
const clearAllButton = document.getElementById('all-clear-button');
const deleteButton = document.getElementById('delete-button');

let firstValue = 0;
let operatorValue = '';
let awaitingNextValue = false; 

// Display number value
function displayNumberValue(number) {
    if (awaitingNextValue) {
      calculatorDisplay.textContent = number;
      awaitingNextValue = false;
    } else {
      const displayValue = calculatorDisplay.textContent;
      calculatorDisplay.textContent = displayValue === '0' ? number : displayValue + number;
    }
  }

// Append decimal 
function applyDecimal() {
    if(awaitingNextValue) return;
    if(!calculatorDisplay.textContent.includes('.')) {
        calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`;
    }
}

// Delete function, deletes last digit input
function deleteLastDigit() {
    if(calculatorDisplay.textContent.length === 1) {
        calculatorDisplay.textContent = 0;
    } else if(calculatorDisplay.textContent.length > 1) {
        calculatorDisplay.textContent = calculatorDisplay.textContent.toString().slice(0, (calculatorDisplay.textContent.length - 1));
    }
}

// Operator calculations
const calculate = {
    '/': (firstNumber, secondNumber) => firstNumber / secondNumber,
  
    '*': (firstNumber, secondNumber) => firstNumber * secondNumber,
  
    '+': (firstNumber, secondNumber) => firstNumber + secondNumber,
  
    '-': (firstNumber, secondNumber) => firstNumber - secondNumber,
  
    '=': (firstNumber, secondNumber) => secondNumber,
  };


function useOperator(operator) {
    const currentValue = Number(calculatorDisplay.textContent);
    // Prevent multiple operators
    if (operatorValue && awaitingNextValue) return;
    
    // Assign firstValue if no value
    if (!firstValue) {
        firstValue = currentValue;
    } else {
        const calculation = calculate[operatorValue](firstValue, currentValue);
        calculatorDisplay.textContent = calculation;
        firstValue = calculation;
    }
    // Ready for next value, store operator
    awaitingNextValue = true;
    operatorValue = operator;
}

// Input button event listeners 
inputButtons.forEach((inputButton) => {
    if(inputButton.classList.length === 0) {
        inputButton.addEventListener('click', () => displayNumberValue(inputButton.value));
    } else if(inputButton.classList.contains("operator")) {
        inputButton.addEventListener('click', () => useOperator(inputButton.value));
    } else if (inputButton.classList.contains("decimal")) {
        inputButton.addEventListener('click', () => applyDecimal());
    } else if (inputButton.classList.contains("delete-button")) {
        inputButton.addEventListener('click', () => deleteLastDigit());
    }
});

// Clear all function
function clearAll() {
    firstValue = 0; 
    operatorValue = ''; 
    awaitingNextValue = false; 
    calculatorDisplay.textContent = '0';
}

// Clear all button event listener
clearAllButton.addEventListener('click', clearAll);