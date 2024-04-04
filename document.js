document.addEventListener('DOMContentLoaded', function () {
    const screen = document.getElementById('screen');
    let currentInput = '0';
    let operator = '';
    let firstOperand = '';
  
    function updateScreen() {
      screen.innerText = currentInput;
    }
  
    function clear() {
      currentInput = '0';
      operator = '';
      firstOperand = '';
      updateScreen();
    }
  
    function backspace() {
      currentInput = currentInput.slice(0, -1);
      if (currentInput === '') currentInput = '0';
      updateScreen();
    }
  
    function appendNumber(number) {
      if (currentInput === '0' || currentInput === 'Error') {
        currentInput = number;
      } else {
        currentInput += number;
      }
      updateScreen();
    }
  
    function appendDecimal() {
      if (!currentInput.includes('.')) {
        currentInput += '.';
        updateScreen();
      }
    }
  
    function setOperator(op) {
      if (operator !== '' && currentInput !== 'Error') {
        calculate();
      }
      operator = op;
      if (currentInput !== 'Error') {
        firstOperand = currentInput;
      }
      currentInput = '';
      updateScreen();
    }
  
    function calculate() {
      const a = parseFloat(firstOperand);
      const b = parseFloat(currentInput);
      let result;
      switch (operator) {
        case '+':
          result = a + b;
          break;
        case '-':
          result = a - b;
          break;
        case '×':
          result = a * b;
          break;
        case '÷':
          if (b === 0) {
            result = 'Error';
          } else {
            result = a / b;
          }
          break;
      }
      currentInput = result.toString();
      operator = '';
      firstOperand = '';
      updateScreen();
    }
  
    function displayResult() {
      if (operator !== '' && currentInput !== 'Error') {
        calculate();
      }
    }
  
    document.getElementById('clear').addEventListener('click', clear);
    document.getElementById('backspace').addEventListener('click', backspace);
    document.getElementById('divide').addEventListener('click', () => setOperator('÷'));
    document.getElementById('multiply').addEventListener('click', () => setOperator('×'));
    document.getElementById('subtract').addEventListener('click', () => setOperator('-'));
    document.getElementById('add').addEventListener('click', () => setOperator('+'));
    document.getElementById('equals').addEventListener('click', displayResult);
  
    document.querySelectorAll('.number').forEach(button => {
      button.addEventListener('click', () => appendNumber(button.innerText));
    });
  
    document.getElementById('decimal').addEventListener('click', appendDecimal);
  });
  