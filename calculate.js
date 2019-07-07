var Calculator = /** @class */ (function () {
    function Calculator() {
        this.n1 = '';
        this.n2 = '';
        this.operator = '';
        this.result = '0';
        this.stepNum = '';
        this.prevOperator = '';
        this.createCalculator();
        this.createOutput();
        this.createButtons();
    }
    Calculator.prototype.createCalculator = function () {
        this.calculatorBox = document.createElement('div');
        this.calculatorBox.className = 'calculator';
        document.body.appendChild(this.calculatorBox);
    };
    Calculator.prototype.createOutput = function () {
        var outputBox = document.createElement('div');
        this.outputSpan = document.createElement('span');
        this.outputSpan.textContent = '0';
        this.outputSpan.className = 'output-span';
        outputBox.className = 'output-box';
        outputBox.appendChild(this.outputSpan);
        this.calculatorBox.appendChild(outputBox);
    };
    Calculator.prototype.createButtons = function () {
        var _this = this;
        var keysRows = [
            ['Clear', '+/-', '÷'],
            ['7', '8', '9', '×'],
            ['4', '5', '6', '-'],
            ['1', '2', '3', '+'],
            ['0', '.', '='],
        ];
        keysRows.forEach(function (keys) {
            var rowBox = document.createElement('div');
            rowBox.className = 'buttons-row';
            keys.forEach(function (keyText) {
                rowBox.appendChild(_this.createButton(keyText));
            });
            _this.calculatorBox.appendChild(rowBox);
        });
        this.listenButtonsEvent();
    };
    Calculator.prototype.createButton = function (text) {
        var button = document.createElement('button');
        button.textContent = text;
        button.className = "button button__" + text;
        return button;
    };
    Calculator.prototype.listenButtonsEvent = function () {
        var _this = this;
        this.calculatorBox.addEventListener('click', function (e) {
            if (e.target instanceof HTMLButtonElement) {
                var buttonVal = e.target.textContent;
                if ('1234567890.'.indexOf(buttonVal) > -1) {
                    // 当按数字键时，如果操作符存在，那么一定是对n2进行赋值
                    if (_this.operator) {
                        _this.n2 = _this.getNewNumString(_this.n2, buttonVal);
                        _this.outputSpan.textContent = _this.n2;
                    }
                    else {
                        _this.n1 = _this.getNewNumString(_this.n1, buttonVal);
                        _this.outputSpan.textContent = _this.n1;
                    }
                }
                else {
                    if ('+-×÷'.indexOf(buttonVal) > -1) {
                        // 如果n1和n2已被赋值，那么先计算之前n1和n2的结果，再记录新的操作符，并把n2清空
                        if (_this.n1 && _this.n2) {
                            _this.result = _this.getResult(_this.n1, _this.n2, _this.operator);
                            _this.outputSpan.textContent = _this.result;
                            _this.n1 = _this.result;
                        }
                        _this.n2 = ''; // 清空n2以存储新值
                        _this.stepNum = ''; // 清空逐级计算的stepNum
                        _this.prevOperator = ''; // 清空先前的操作符
                        _this.operator = buttonVal;
                    }
                    else if (buttonVal === '=') {
                        _this.n1 = _this.n1 || _this.result;
                        _this.n2 = _this.n2 || _this.stepNum || _this.n1;
                        _this.operator = _this.operator || _this.prevOperator;
                        _this.result = _this.getResult(_this.n1, _this.n2, _this.operator);
                        _this.outputSpan.textContent = _this.result;
                        _this.n1 = _this.result;
                        _this.stepNum = _this.n2;
                        _this.prevOperator = _this.operator;
                        _this.operator = '';
                        _this.n2 = '';
                    }
                    else if (buttonVal === '+/-') {
                        if (_this.n2) {
                            _this.n2 = _this.getOppositeNumString(_this.n2);
                            _this.outputSpan.textContent = _this.n2;
                        }
                        else if (_this.n1) {
                            _this.n1 = _this.getOppositeNumString(_this.n1);
                            _this.outputSpan.textContent = _this.n1;
                        }
                    }
                    else {
                        // clear
                        _this.n1 = '';
                        _this.n2 = '';
                        _this.operator = '';
                        _this.result = '0';
                        _this.outputSpan.textContent = _this.result;
                    }
                }
            }
        });
    };
    Calculator.prototype.getNewNumString = function (originVal, inputVal) {
        var result = (!(inputVal === '.' && originVal.match(/\./g))) ? originVal + inputVal : originVal;
        return result === '.' ? '0.' : result;
    };
    Calculator.prototype.getOppositeNumString = function (originVal) {
        return originVal.indexOf('-') > -1 ? originVal.slice(1) : '-' + originVal;
    };
    Calculator.prototype.getResult = function (n1, n2, operator) {
        var num1 = parseFloat(n1) || 0, num2 = parseFloat(n2) || 0;
        if (operator === '+') {
            return String(num1 + num2);
        }
        if (operator === '-') {
            return String(num1 - num2);
        }
        if (operator === '×') {
            return String(num1 * num2);
        }
        if (operator === '÷') {
            return num2 === 0 ? '错误' : String(num1 / num2);
        }
        return n1;
    };
    return Calculator;
}());
new Calculator();
