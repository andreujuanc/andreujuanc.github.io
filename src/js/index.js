import styles from '../css/index.css'
import commands from './commands';
import std from './io/std';
import terminal from './io/terminal';
import loadingText from '../txt/init.txt'

const version = '0.7'
console.log('Starting OS v', version)
document.getElementById('version').innerText = "v" + version
function AndreuOS() {

    let welcomeText = [
        'Welcome to Juan C. Andreu\'s home portal.',
        'Type help for a list of commands.'
    ];

    function init() {

        document.body.classList.add("background");

        var loadingLines = loadingText.replace('\r', '').split('\n')
        std.push(loadingLines, () => {
            document.getElementById('logo').style.display = null;

            std.clear()

            std.push(welcomeText[0]);
            std.push(welcomeText[1]);

            document.getElementById('input').style.display = null;
            document.getElementById('input').scrollIntoView(false)
            
            setTimeout(function () {
                inputtext.scrollIntoView(false)
                inputtext.focus();
            }, 50);
        });


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
