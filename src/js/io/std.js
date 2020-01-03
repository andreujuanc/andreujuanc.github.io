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

function writeConsole(text) {
    if (typeof text !== 'string') return false;
    let newLine = document.createElement('div');
    newLine.innerHTML = text;
    output.appendChild(newLine);
    return true;
}

function sendBuffer() {
    terminal.updatePromptText();
    let text = outBuffer;
    outBuffer = [];
    if (!Array.isArray(text)) {
        text = [text];
    }

    let queueNext = function () {
        const delay = (Math.random() * 20) + 10;
        if (writeConsole(text.shift()))
            setTimeout(queueNext, delay);
        setTimeout(sendBuffer, delay);
    }
    queueNext();
}

function push(line) {
    if (Array.isArray(line))
        outBuffer.push(...line);
    else
        outBuffer.push(line);
}

export default {
    push,
    clear,
    read,
    writeConsole,
    sendBuffer

}