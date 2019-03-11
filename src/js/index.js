import styles from '../css/index.css'
import commands from './commands';
import std from './io/std';
import terminal from './io/terminal';
const version = '0.6'
console.log('Starting OS v', version)

function AndreuOS() {

    let line = '';
    let welcomeText = [
        'Welcome to Juan C. Andreu\'s home portal.',
        'Type help for a list of commands.'
    ];    

    function init() {
        document.body.classList.add("background");
        
        std.push(welcomeText[0]);
        std.push(welcomeText[1]);
        std.sendBuffer();
        
        setTimeout(function () {
            inputtext.focus();
        }, 50);
    }


    return {
        init: init,
        onkeypress: terminal.onkeypress
    }
}

let os = new AndreuOS();
window.onload = os.init
window.onkeyup = os.onkeypress;
window.onclick = function () {
    inputtext.focus();
}
