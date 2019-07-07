{
  // 计算器容器
  let calculatorBox = document.createElement('div')
  calculatorBox.className = 'calculator'
  document.body.appendChild(calculatorBox)

  // 结果显示区
  let outputBox = document.createElement('div')
  let outputSpan = document.createElement('span')
  outputSpan.textContent = '0'
  outputSpan.className = 'output-span'
  outputBox.className = 'output-box'
  outputBox.appendChild(outputSpan)
  calculatorBox.appendChild(outputBox)

  // 按钮区
  function createButton(text) {
    let button = document.createElement('button')
    button.textContent = text
    button.className = `button button__${text}`
    return button
  }
  let keysRows = [
    ['Clear', '+/-', '÷'],
    ['7', '8', '9', '×'],
    ['4', '5', '6', '-'],
    ['1', '2', '3', '+'],
    ['0', '.', '='],
  ]
  keysRows.forEach(keys => {
    let rowBox = document.createElement('div')
    rowBox.className = 'buttons-row'
    keys.forEach(keyText => {
      rowBox.appendChild(createButton(keyText))
    })
    calculatorBox.appendChild(rowBox)
  })

  // 按钮显示操作
  let n1 = '', n2 = '', operator = '', result = '0', stepNum = '', prevOperator = ''
  calculatorBox.addEventListener('click', (e) => {
    if (e.target instanceof HTMLButtonElement) {
      let buttonVal = e.target.textContent
      if ('1234567890.'.indexOf(buttonVal) > -1) {
        // 当按数字键时，如果操作符存在，那么一定是对n2进行赋值
        if (operator) {
          n2 = getNewNumString(n2, buttonVal)
          outputSpan.textContent = n2
        } else {
          n1 = getNewNumString(n1, buttonVal)
          outputSpan.textContent = n1
        }
      } else {
        if ('+-×÷'.indexOf(buttonVal) > -1) {
          // 如果n1和n2已被赋值，那么先计算之前n1和n2的结果，再记录新的操作符，并把n2清空
          if (n1 && n2) {
            result = getResult(n1, n2, operator)
            outputSpan.textContent = result
            n1 = result
          }
          n2 = ''             // 清空n2以存储新值
          stepNum = ''        // 清空逐级计算的stepNum
          prevOperator = ''   // 清空先前的操作符
          operator = buttonVal
        } else if (buttonVal === '=') {
          n1 = n1 || result
          n2 = n2 || stepNum || n1
          operator = operator || prevOperator
          result = getResult(n1, n2, operator)
          outputSpan.textContent = result
          n1 = result
          stepNum = n2
          prevOperator = operator
          operator = ''
          n2 = ''
        } else if (buttonVal === '+/-') {
          if (n2) {
            n2 = getOppositeNumString(n2)
            outputSpan.textContent = n2
          } else if (n1) {
            n1 = getOppositeNumString(n1)
            outputSpan.textContent = n1
          }
        } else {
          // clear
          n1 = ''
          n2 = ''
          operator = ''
          result = '0'
          outputSpan.textContent = result
        }
      }
    }
  })

  function getNewNumString(originVal, inputVal) {
    let result = (!(inputVal === '.' && originVal.match(/\./g))) ? originVal + inputVal : originVal
    return result === '.' ? '0.' : result
  }
  function getOppositeNumString(originVal) {
    return originVal.indexOf('-') > -1 ? originVal.slice(1) : '-' + originVal
  }

  function getResult(n1, n2, operator) {
    const num1 = parseFloat(n1) || 0, num2 = parseFloat(n2) || 0
    if (operator === '+') {
      return String(num1 + num2)
    }
    if (operator === '-') {
      return String(num1 - num2)
    }
    if (operator === '×') {
      return String(num1 * num2)
    }
    if (operator === '÷') {
      return num2 === 0 ? '错误' : String(num1 / num2)
    }
    return n1
  }
}