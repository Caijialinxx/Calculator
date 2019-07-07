{
    // 计算器容器
    var calculatorBox_1 = document.createElement('div');
    calculatorBox_1.className = 'calculator';
    document.body.appendChild(calculatorBox_1);
    // 结果显示区
    var outputBox = document.createElement('div');
    var outputSpan_1 = document.createElement('span');
    outputSpan_1.textContent = '0';
    outputSpan_1.className = 'output-span';
    outputBox.className = 'output-box';
    outputBox.appendChild(outputSpan_1);
    calculatorBox_1.appendChild(outputBox);
    // 按钮区
    function createButton(text) {
        var button = document.createElement('button');
        button.textContent = text;
        button.className = "button button__" + text;
        return button;
    }
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
            rowBox.appendChild(createButton(keyText));
        });
        calculatorBox_1.appendChild(rowBox);
    });
    // 按钮显示操作
    var n1_1 = '', n2_1 = '', operator_1 = '', result_1 = '0', stepNum_1 = '', prevOperator_1 = '';
    calculatorBox_1.addEventListener('click', function (e) {
        if (e.target instanceof HTMLButtonElement) {
            var buttonVal = e.target.textContent;
            if ('1234567890.'.indexOf(buttonVal) > -1) {
                // 当按数字键时，如果操作符存在，那么一定是对n2进行赋值
                if (operator_1) {
                    n2_1 = getNewNumString(n2_1, buttonVal);
                    outputSpan_1.textContent = n2_1;
                }
                else {
                    n1_1 = getNewNumString(n1_1, buttonVal);
                    outputSpan_1.textContent = n1_1;
                }
            }
            else {
                if ('+-×÷'.indexOf(buttonVal) > -1) {
                    // 如果n1和n2已被赋值，那么先计算之前n1和n2的结果，再记录新的操作符，并把n2清空
                    if (n1_1 && n2_1) {
                        result_1 = getResult(n1_1, n2_1, operator_1);
                        outputSpan_1.textContent = result_1;
                        n1_1 = result_1;
                    }
                    n2_1 = ''; // 清空n2以存储新值
                    stepNum_1 = ''; // 清空逐级计算的stepNum
                    prevOperator_1 = ''; // 清空先前的操作符
                    operator_1 = buttonVal;
                }
                else if (buttonVal === '=') {
                    n1_1 = n1_1 || result_1;
                    n2_1 = n2_1 || stepNum_1 || n1_1;
                    operator_1 = operator_1 || prevOperator_1;
                    result_1 = getResult(n1_1, n2_1, operator_1);
                    outputSpan_1.textContent = result_1;
                    n1_1 = result_1;
                    stepNum_1 = n2_1;
                    prevOperator_1 = operator_1;
                    operator_1 = '';
                    n2_1 = '';
                }
                else if (buttonVal === '+/-') {
                    if (n2_1) {
                        n2_1 = getOppositeNumString(n2_1);
                        outputSpan_1.textContent = n2_1;
                    }
                    else if (n1_1) {
                        n1_1 = getOppositeNumString(n1_1);
                        outputSpan_1.textContent = n1_1;
                    }
                }
                else {
                    // clear
                    n1_1 = '';
                    n2_1 = '';
                    operator_1 = '';
                    result_1 = '0';
                    outputSpan_1.textContent = result_1;
                }
            }
        }
    });
    function getNewNumString(originVal, inputVal) {
        var result = (!(inputVal === '.' && originVal.match(/\./g))) ? originVal + inputVal : originVal;
        return result === '.' ? '0.' : result;
    }
    function getOppositeNumString(originVal) {
        return originVal.indexOf('-') > -1 ? originVal.slice(1) : '-' + originVal;
    }
    function getResult(n1, n2, operator) {
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
    }
}
