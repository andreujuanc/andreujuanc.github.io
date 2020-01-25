// @ts-ignore
import styles from '../css/index.css'
import commands from './commands';
import std from './io/std';
import terminal from './io/terminal';
// @ts-ignore
import loadingText from '../txt/init.txt'

const version = '1.0.3'
console.log('Starting OS v', version)



function AndreuOS() {
    const versionElement = document.getElementById('version')
    const logoElement = document.getElementById('logo')
    const inputElement = document.getElementById('input')
    const inputTextElement = document.getElementById('inputtext')    

    let welcomeText = [
        'Welcome to Juan C. Andreu\'s home portal.',
        'Type help for a list of commands.'
    ];

    function init() {

        if (versionElement == null || logoElement == null || inputElement == null || inputTextElement == null) {
            throw "Could not init, some elements are not properly loaded in the dom"
        }
    
        versionElement.innerText = "v" + version

        document.body.classList.add("background");

        var loadingLines = loadingText.replace('\r', '').split('\n')
        std.push(loadingLines, () => {
            logoElement.style.display = 'initial';

            std.clear()

            std.push(welcomeText[0]);
            std.push(welcomeText[1]);

            inputElement.style.display = 'initial';
            inputElement.scrollIntoView(false)

            setTimeout(function () {
                inputTextElement.scrollIntoView(false)
                inputTextElement.focus();
            }, 50);
        });
    }

    function onkeypress() {
        if (inputTextElement == null) {
            throw "Could not init, some elements are not properly loaded in the dom"
        }
        
        inputTextElement.focus();
    }

    this.init =  init
    this.onkeypress = terminal.onkeypress
    this.onclick = onclick
}

let os = new AndreuOS();
window.onload = os.init
window.onkeyup = os.onkeypress;
window.onclick = os.onclick
