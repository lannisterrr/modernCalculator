const calculatorDisplay = document.querySelector('h1');
const inputBtns = document.querySelectorAll('button');
const clearBtn = document.getElementById('clear-btn');

let firstValue = 0;
let operatorValue = '';
let awaitingNext = false;

function sendNumberValue(number){
    // Replace Current display if first value is entered
    if(awaitingNext){
        calculatorDisplay.textContent = number;
        awaitingNext = false;
    }else{
    // if current display value is 0 , replace it , if not add number
    const displayValue = calculatorDisplay.textContent;
    calculatorDisplay.textContent = displayValue === '0' ? number : displayValue + number;
    }

}

function addDecimal(){
    // if operator pressed , don't add decimal
    if(awaitingNext) return; // it true , don't run rest of the function
    // if no decimal , add one
    if(!calculatorDisplay.textContent.includes('.')){
        calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`;
    }
}

/**
 we are going to create a object, a calculate object, and it's going to have five values.The key of each value is going to be an operator.And then we're gonna pass in our first and second number.That is then going to be run through a function with the corresponding operator.
 */

const calculate = {
    '/' : (firstNumber , secondNumber) => firstNumber / secondNumber,

    '*' : (firstNumber , secondNumber) => firstNumber * secondNumber,
    
    '+' : (firstNumber , secondNumber) => firstNumber + secondNumber,
    
    '-' : (firstNumber , secondNumber) => firstNumber - secondNumber,
    
    '=' : (firstNumber , secondNumber) => secondNumber
};


function useOperator(operator){
    const currentValue = Number(calculatorDisplay.textContent); // this value updates
    // console.log('firstValue',currentValue); important!

    // Prevent multiple operators
    if(operatorValue && awaitingNext) {
        operatorValue = operator; // if we change our mind to change operator , then it will help
        return;
    }

    // Assign first value , if no value. after second value is entered update firstValue to be currentValue
    if(!firstValue){
        firstValue = currentValue;
    } else{
        console.log(firstValue, operatorValue, currentValue);
        const calculation = calculate[operatorValue](firstValue,currentValue); // figure this out.  Answer 'calculate.+' doesnot work because Property identifies can only be alphanumeric (and _ and $)
        calculatorDisplay.textContent = calculation;
        firstValue = calculation;

    }
    // Read for next value, store operator . this triggers after typing our operator
    awaitingNext = true;
    operatorValue = operator;
}

// console.log(inputBtns);

// Add event Listeners for numbers , operators , decimal buttons
inputBtns.forEach((inputBtn) => {
    // console.log(inputBtn);
    if(inputBtn.classList.length === 0){
        inputBtn.addEventListener('click', () => sendNumberValue(inputBtn.value));
    }else if(inputBtn.classList.contains('operator')){
        inputBtn.addEventListener('click', () => useOperator(inputBtn.value));
    }else if(inputBtn.classList.contains('decimal')){
        inputBtn.addEventListener('click',addDecimal);
    }
});

// Clear btn 
clearBtn.addEventListener('click', () => {
 firstValue = 0;
 operatorValue = '';
 awaitingNext = false;
 calculatorDisplay.textContent = '0';
});