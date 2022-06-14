const maxVisor = 11
let count = []
let saveAction

function botao(num) {
  if (document.getElementById('result').innerHTML.length < maxVisor) {
    document.getElementById('result').innerHTML += num
  }
}

function btnCalc(s) {
  let currentNumber = document.getElementById('result').innerHTML

  if (currentNumber.length === 0) {
    return
  }

  count.push(Number(document.getElementById('result').innerHTML))

  if (currentNumber.split('')[currentNumber.length - 1] == '.') {
    document.getElementById('historic').innerHTML += ` ${
      document.getElementById('result').innerHTML
    }0 ${s}`
  } else {
    document.getElementById('historic').innerHTML += ` ${
      document.getElementById('result').innerHTML
    } ${s}`
  }

  document.getElementById('result').innerHTML = ''
  count.push(s)
}

function addComma() {
  let currentNumber = document.getElementById('result').innerHTML

  if (currentNumber == '') {
    document.getElementById('result').innerHTML = '0.'
  } else if (!currentNumber.includes('.')) {
    document.getElementById('result').innerHTML += '.'
  }
}

function result() {
  let currentAccum = document.getElementById('historic').innerHTML
  let currentNumber = document.getElementById('result').innerHTML

  if (
    currentAccum[currentAccum.length - 1] === '=' &&
    currentNumber.length > 0
  ) {
    document.getElementById('result').innerHTML = processAction(
      Number(currentNumber),
      Number(currentNumber),
      saveAction
    )
      .toString()
      .substring(0, MAX_VISOR_CHAR)
  }

  if (count.length === 0) {
    return
  }

  count.push(Number(document.getElementById('result').innerHTML))
  document.getElementById('historic').innerHTML += ` ${
    document.getElementById('result').innerHTML
  } =`
  proccessResult()
}

function proccessResult() {
  let action = null
  let current = null

  let total = 0

  if (isNaN(count[count.length - 1])) {
    count.pop()
  }

  count.forEach(n => {
    if (!isNaN(n)) {
      if (current == null) {
        current = n
      } else {
        total += processAction(current, n, action)
        current = null
      }
    } else {
      action = n
      saveAction = n
    }
  })

  if (current != null) {
    total = processAction(total, current, action)
  }

  document.getElementById('result').innerHTML = total
    .toString()
    .substring(0, maxVisor)
  count = []
}

function processAction(num1, num2, action) {
  switch (action) {
    case '+':
      return num1 + num2
    case '-':
      return num1 - num2
    case 'x':
      return num1 * num2
    case '/':
      return num1 / num2
  }
}

function cleanEntry() {
  document.getElementById('result').innerHTML = ''
}

function cleanAll() {
  document.getElementById('result').innerHTML = ''
  document.getElementById('historic').innerHTML = ''
  count = []
}

function percentage() {
  var currentNumber = document.getElementById('result').innerHTML
  if (currentNumber != '') {
    document.getElementById('result').innerHTML =
      Number(document.getElementById('result').innerHTML) / 100
  }
}
