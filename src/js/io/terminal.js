import commands from '../commands'
import std from './std';

let promptText = null;
let currentLocation = 'guest@andr.eu:~$';
let currentCommand = null;
let promptCallback = null;

function command(name, args) {
    let command = commands.find(x => x.name === name);
    if (typeof command === 'undefined' || command === null) 
        return std.push('Error, Command not found.');
    currentCommand = command;
    let result = command.exec(args);

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

function updatePromptText(){
    let text = promptText;
    if (typeof promptText !== 'string' || promptText.length === 0)
        text = currentLocation;
    consolelocation.textContent = text;
}

function setPromptCallback(callback){
    promptCallback = callback;
}

export default {
    onkeypress,
    setPromptText,
    setPromptCallback,
    updatePromptText
};