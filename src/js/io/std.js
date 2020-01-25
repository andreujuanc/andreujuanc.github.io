import terminal from './terminal';


let outBuffer = [];

function getElements(){
    
    /** @type { HTMLDivElement } */
    const outputElement = document.getElementById('output')
    /** @type { HTMLInputElement } */
    const inputtextElement = document.getElementById('inputtext')

    if (outputElement == null || inputtextElement == null) {
        throw "Could not load dom elements"
    }

    return {
        outputElement,
        inputtextElement
    }
}

const { outputElement, inputtextElement } = getElements()

function clear() {
    outputElement.innerHTML = '';
}

function read(msg) {
    terminal.setPromptText(msg);
    return new Promise(function (resolve, reject) {
        terminal.setPromptCallback(function (textResult) {
            if (typeof textResult !== 'string') return resolve('');
            textResult = textResult.trim();
            resolve(textResult);
        });
    });
}

const ANSI_COLORS = {

    '30': "Black",
    '31': "Red",
    '32': "Green",
    '33': "Yellow",
    '34': "Blue",
    '35': "Purple", //Magenta?
    '36': "Cyan",
    '37': "White",
    // '30': "DarkGray",
    // '34': "LightBlue",
    // '32': "LightGreen",
    // '36': "LightCyan",
    // '31': "lightcoral",//"LightRed", in ansi lightred, but there is no lightred value in css
    // '35': "LightPurple",


}

function writeConsole(text) {
    if (typeof text !== 'string') return false;
    let newLine = document.createElement('div');
    const colorDef = '\u001b[0;'
    let ansiColorIndex = text.indexOf(colorDef)
    if (ansiColorIndex >= 0) {
        const ansiColorIndexEnd = text.indexOf('m', colorDef.length)
        const colorCode = text.slice(ansiColorIndex + colorDef.length, ansiColorIndexEnd)
        const colorName = ANSI_COLORS[colorCode]
        text = text.replace(`\u001b[0;${colorCode}m`, `<span style="color:${colorName}">`)
        text = text.replace('\u001b[0m', '</span>')
    }
    newLine.innerHTML = text;
    outputElement.appendChild(newLine);
    newLine.scrollIntoView(false)
    return true;
}// {  NodeJS.Timeout}
let currentHandler = -1;

function sendBuffer(onCompleted) {
    window.clearInterval(currentHandler)
    terminal.updatePromptText();

    const delay = Math.random() * (Math.random() < 0.9 ? 50 : 300)
    if (writeConsole(outBuffer.shift())) {
        currentHandler = window.setTimeout(sendBuffer.bind(this, onCompleted), delay);
    }
    else {
        currentHandler = -1;
        inputtextElement.scrollIntoView(false)
        inputtextElement.focus();
        onCompleted()
    }
}

function push(line, onCompleted) {
    if (Array.isArray(line))
        outBuffer.push(...line);
    else
        outBuffer.push(line);
    if (currentHandler < 0)
        sendBuffer(onCompleted);
}

export default {
    push,
    clear,
    read,
    writeConsole,
    sendBuffer

}