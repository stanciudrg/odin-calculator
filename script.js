let number1 = [];
let number2 = [];
let operator = undefined;
let operating = false;
let equalized = false;

const output = document.querySelector('.output');
const numberButtons = document.querySelectorAll('.number-buttons');
const operatorButtons = document.querySelectorAll('.operator-buttons');
const equalsButton = document.querySelector('#equals');
const allClearButton = document.querySelector('#allclear');
const clearButton = document.querySelector('#clear');
const plusMinusButton = document.querySelector('#plusminus');

numberButtons.forEach(button => button.addEventListener('click', displayNumbers));
operatorButtons.forEach(button => button.addEventListener('click', selectOperator));
equalsButton.addEventListener('click', equalize);
allClearButton.addEventListener('click', allClear);
clearButton.addEventListener('click', clear);
plusMinusButton.addEventListener('click', changeOperator);

function operate() {

    if (number1.length == 0 || number2.length == 0) { return };

    let a = Number(number1.join(''));
    let b = Number(number2.join(''));

    switch (operator) {

        case ' + ':

            number1 = add().split('');
            number2 = [];
            output.textContent = number1.join('');
            break;

        case ' - ':

            number1 = subtract().split('');
            number2 = [];
            output.textContent = number1.join('');;
            break;

        case ' x ':

            number1 = multiply().split('');
            number2 = [];
            output.textContent = number1.join('');
            break;

        case ' / ':

            if (number1 == '0' || number2 == '0') {

                clear();
                output.textContent = 'ERROR';

            } else {

                number1 = divide().split('');
                number2 = [];
                output.textContent = number1.join('');

            } break;

    }

    function roundDecimals(number) { return number.toFixed(4).replace(/\.?0*$/, ''); };
    function add() { return roundDecimals(a + b); };
    function subtract() { return roundDecimals(a - b); };
    function multiply() { return roundDecimals(a * b); };
    function divide() { return roundDecimals(a / b); };

}

function displayNumbers(e) {

    if (operating == false) {

        if (equalized == true) {

            clear();
            equalized = false;

        }

        if (e.target.id == 'dot' && number1.length == 0) { number1.push('0'); };
        if (e.target.id == 'dot' && number1.includes('.')) { return; };
        if (number1[0] == 0 && number1.length > 0 && number1.length < 2 && e.target.id !== 'dot') { number1.splice(0, 1); };
        if (number1[0] == '-' && number1[1] == 0 && number1[2] != '.' && number1.length > 0 && e.target.id !== 'dot') { number1.splice(1, 1); };

        if (number1.length < 9 || (number1.length < 10 && number1.includes('.'))) {

            number1.push(e.target.textContent)
            output.textContent = number1.join('');
            unselectOperators()

        };

    } else {

        if (e.target.id == 'dot' && number2.length == 0) { number2.push('0'); }
        if (e.target.id == 'dot' && number2.includes('.')) { return; };
        if (number2[0] == 0 && number2.length > 0 && number2.length < 2 && e.target.id !== 'dot') { number2.splice(0, 1); };
        if (number2[0] == '-' && number2[1] == 0 && number2[2] != '.' && number2.length > 0 && e.target.id !== 'dot') { number2.splice(1, 1); };

        if (number2.length < 9 || (number2.length < 10 && number2.includes('.'))) {

            number2.push(e.target.textContent)
            output.textContent = number2.join('');
            unselectOperators()

        };

    }

};

function changeOperator() {

    if (operating == false) {

        if (number1[0] == '-') {

            number1.splice(0, 1);
            output.textContent = number1.join('');

        } else {

            if (number1.length == 0) { number1.unshift('0'); }

            number1.unshift('-');
            output.textContent = number1.join('');

        }

    } else {

        if (number2[0] == '-') {

            number2.splice(0, 1);
            output.textContent = number2.join('');

        } else {

            if (number2.length == 0) { number2.unshift('0'); }

            number2.unshift('-');
            output.textContent = number2.join('');

        }
    }
};

function clear() {

    if (operating == false) {

        number1 = ['0'];
        output.textContent = number1.join('');

    } else if (operating == true && number2.length == 0) {

        number1 = ['0'];
        output.textContent = number1.join('');
        stopOperating();
        unselectOperators();

    } else if (operating == true && number1.length != 0) {

        number2 = ['0'];
        output.textContent = number2.join('');

    }
};

function selectOperator(e) {

    number1.length > 0 ? operating = true : operating = false;

    if (number2.length > 0) {

        operate();
        operator = e.target.textContent;

    } else {

        operator = e.target.textContent;

    }

    unselectOperators();
    this.classList.add('selected');

};

function allClear() {

    output.textContent = '0';
    number1 = [];
    number2 = [];
    stopOperating();
    unselectOperators();
};


function equalize() {

    operate();
    equalized = true;
    stopOperating();
    unselectOperators();

};

function stopOperating() {

    operator = undefined;
    operating = false;

};

function unselectOperators() { operatorButtons.forEach(button => { button.classList.remove('selected') }) };