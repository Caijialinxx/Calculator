class Calculator {
  calculatorBox: HTMLDivElement
  outputSpan: HTMLSpanElement
  n1: string = ''
  n2: string = ''
  operator: string = ''
  result: string = '0'
  stepNum: string = ''
  prevOperator: string = ''

  constructor() {
    this.createCalculator()
    this.createOutput()
    this.createButtons()
  }
  createCalculator() {
    this.calculatorBox = document.createElement('div')
    this.calculatorBox.className = 'calculator'
    document.body.appendChild(this.calculatorBox)
  }
  createOutput() {
    let outputBox = document.createElement('div')
    this.outputSpan = document.createElement('span')
    this.outputSpan.textContent = '0'
    this.outputSpan.className = 'output-span'
    outputBox.className = 'output-box'
    outputBox.appendChild(this.outputSpan)
    this.calculatorBox.appendChild(outputBox)
  }
  createButtons() {
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
        rowBox.appendChild(this.createButton(keyText))
      })
      this.calculatorBox.appendChild(rowBox)
    })
    this.listenButtonsEvent()
  }
  createButton(text: string) {
    let button = document.createElement('button')
    button.textContent = text
    button.className = `button button__${text}`
    return button
  }
  listenButtonsEvent() {
    this.calculatorBox.addEventListener('click', (e) => {
      if (e.target instanceof HTMLButtonElement) {
        const buttonVal = e.target.textContent
        if ('1234567890.'.indexOf(buttonVal) > -1) {
          // 当按数字键时，如果操作符存在，那么一定是对n2进行赋值
          const target = this.operator ? 'n2' : 'n1'
          this[target] = this.getNewNumString(this[target], buttonVal)
          this.outputSpan.textContent = this[target]
        } else {
          if ('+-×÷'.indexOf(buttonVal) > -1) {
            // 如果n1和n2已被赋值，那么先计算之前n1和n2的结果，再记录新的操作符，并把n2清空
            if (this.n1 && this.n2) {
              this.result = this.getResult(this.n1, this.n2, this.operator)
              this.outputSpan.textContent = this.result
              this.n1 = this.result
            }
            this.n2 = ''             // 清空n2以存储新值
            this.stepNum = ''        // 清空逐级计算的stepNum
            this.prevOperator = ''   // 清空先前的操作符
            this.operator = buttonVal
          } else if (buttonVal === '=') {
            this.n1 = this.n1 || this.result
            this.n2 = this.n2 || this.stepNum || this.n1
            this.operator = this.operator || this.prevOperator
            this.result = this.getResult(this.n1, this.n2, this.operator)
            this.outputSpan.textContent = this.result
            this.n1 = this.result
            this.stepNum = this.n2              // 暂存n2，使得后面可以继续逐级计算
            this.prevOperator = this.operator   // 暂存操作符，使得后面可以继续逐级计算
            this.operator = ''                  // 清空操作符，以准备存储新操作符
            this.n2 = ''                        // 清空n2，以准备存储新值
          } else if (buttonVal === '+/-') {
            if (this.n2) {
              this.n2 = this.getOppositeNumString(this.n2)
              this.outputSpan.textContent = this.n2
            } else if (this.n1) {
              this.n1 = this.getOppositeNumString(this.n1)
              this.outputSpan.textContent = this.n1
            }
          } else {
            this.resetAll()
          }
        }
      }
    })
  }
  resetAll() {
    this.n1 = ''
    this.n2 = ''
    this.operator = ''
    this.result = '0'
    this.stepNum = ''
    this.prevOperator = ''
    this.outputSpan.textContent = this.result
  }

  getNewNumString(originVal, inputVal) {
    let result = (!(inputVal === '.' && originVal.match(/\./g))) ? originVal + inputVal : originVal
    return result === '.' ? '0.' : result
  }
  getOppositeNumString(originVal) {
    return originVal.indexOf('-') > -1 ? originVal.slice(1) : '-' + originVal
  }

  getResult(n1, n2, operator) {
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

new Calculator()