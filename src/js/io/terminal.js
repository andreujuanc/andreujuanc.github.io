import commands from '../commands'
import std from './std';
import session from '../session';

let promptText = null;
let currentCommand = null;
let promptCallback = null;

function command(name, args) {
    let command = commands.find(x => x.name === name);
    if (typeof command === 'undefined' || command === null)
        return std.push('Error, Command not found.');
    currentCommand = command;

    let result = null;
    try {
        result = command.exec(args);
    }
    catch (ex) {
        std.push(`${ex}`);
    }

    if (typeof result === 'undefined' || result === null) {
        currentCommand = null;
        return;
    }

    if (typeof result.then === 'function') {
        result.then(function () {
            currentCommand = null;
            promptText = null;
        }, function (error) {
            currentCommand = null;
            alert(error);
        })
    }
    else
        currentCommand = null;
}

function onkeypress(args) {
    if (args.keyCode == 13) {
        let result = inputtext.value;
        inputtext.value = '';
        if (currentCommand !== null && typeof promptCallback === 'function')
            promptCallback(result);
        else
            parseLine(result);
    }
}

function parseLine(text) {
    std.push(consolelocation.textContent + ' ' + text)
    if (typeof text !== 'string') return false;
    let words = text.replace(/ /g, ' ').split(' ');
    if (words.length === 0) return false;
    command(words[0], words.length > 0 ? words.splice(1, words.length - 1) : undefined);
    return true;
}

function setPromptText(text) {
    promptText = text;
    updatePromptText();
}

function updatePromptText() {
    let text = promptText;
    if (typeof promptText !== 'string' || promptText.length === 0) {
        const { currentUser, hostname, currentLocation } = session();
        text = `${currentUser}@${hostname}:${currentLocation
            .join('/')
            .replace('//', '/')
            .replace(`/home/${currentUser}`, '~')}$`;
    }
    consolelocation.textContent = text;
}

function setPromptCallback(callback) {
    promptCallback = callback;
}

export default {
    onkeypress,
    setPromptText,
    setPromptCallback,
    updatePromptText
};