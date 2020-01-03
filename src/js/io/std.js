import terminal from './terminal';


let outBuffer = [];

function clear() {
    output.innerHTML = '';
}

function read(msg) {
    console.log('reading', msg);
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
    '34': "Blue",
    '32': "Green",
    '36': "Cyan",
    '31': "Red",
    '35': "Purple",
    '33': "Brown",
    '37': "Gray",
    '30': "DarkGray",
    '34': "LightBlue",
    '32': "LightGreen",
    '36': "LightCyan",
    '31': "LightRed",
    '35': "LightPurple",
    '33': "Yellow",
    '37': "White",
     
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
        console.log(colorName)
        text = text.replace('\u001b[0;32m', `<span style="color:${colorName}">`)
        text = text.replace('[0m', '</span>')
    }
    newLine.innerHTML = text;
    output.appendChild(newLine);
    newLine.scrollIntoView(false)
    return true;
}

let currentHandler = -1;

function sendBuffer(onCompleted) {
    clearInterval(currentHandler)
    terminal.updatePromptText();

    const delay = Math.random() * (Math.random() < 0.9 ? 50 : 300)
    if (writeConsole(outBuffer.shift())) {
        currentHandler = setTimeout(sendBuffer.bind(this, onCompleted), delay);
    }
    else {
        currentHandler = -1;
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