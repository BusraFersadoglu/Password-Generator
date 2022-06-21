const resultElem = document.getElementById("result")
const clipboardElem = document.getElementById("clipboard")
const lengthElem = document.getElementById("length")
const uppercaseElem = document.getElementById("uppercase")
const lowercaseElem = document.getElementById("lowercase")
const numbersElem = document.getElementById("numbers")
const symbolsElem = document.getElementById("symbols")
const generateElem = document.getElementById("generate")

clipboardElem.addEventListener("click", () => {
    const textarea = document.createElement('textarea')
    const password = resultElem.innerText

    if(!password) { return }

    textarea.value = password
    document.body.appendChild(textarea)
    textarea.select()
    document.execCommand('copy')
    textarea.remove()
    alert('Password copied to clipboard!')

})
generate.addEventListener("click", () => {

    const lengthVal = +lengthElem.value
    const hasUpper = uppercaseElem.checked
    const hasLower = lowercaseElem.checked
    const hasNumber = numbersElem.checked
    const hasSymbol = symbolsElem.checked

    resultElem.innerText = generatePassword(hasUpper, hasLower, hasNumber, hasSymbol, lengthVal)

})

function generatePassword(lower, upper, number, symbol, lengthVal) {
    let generatedPassword = ''
    const typesCount = lower + upper + number + symbol
    const typesArr = [{lower}, {upper}, {number}, {symbol}].filter(item => Object.values(item)[0])
    
    if(typesCount === 0) {
        return ''
    }

    for(let i = 0; i < lengthVal; i += typesCount) {
        typesArr.forEach(type => {
            const funcName = Object.keys(type)[0]
            generatedPassword += randomFunc[funcName]()
        })
    }

    const finalPassword = generatedPassword.slice(0, lengthVal)

    return finalPassword
}

const randomFunc = {
    lower: getLower,
    upper: getUpper,
    number: getNumber,
    symbol: getSymbol
}

function getLower(){
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97)
}

function getUpper(){
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65)
}

function getNumber(){
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48)
}

function getSymbol(){
    const symbols = '!@#$%^&*(){}[]=<>/,.'
    return symbols[Math.floor(Math.random() * symbols.length)]
}