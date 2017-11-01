/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__terminal__ = __webpack_require__(2);



let outBuffer =  [];

function clear() {
    output.innerHTML = '';
}

function read(msg) {
    console.log('reading', msg);
    __WEBPACK_IMPORTED_MODULE_0__terminal__["a" /* default */].setPromptText(msg);
    return new Promise(function (resolve, reject) {
        __WEBPACK_IMPORTED_MODULE_0__terminal__["a" /* default */].setPromptCallback(function (textResult) {
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
    __WEBPACK_IMPORTED_MODULE_0__terminal__["a" /* default */].updatePromptText();
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

function push(line){
    outBuffer.push(line);
}

/* harmony default export */ __webpack_exports__["a"] = ({
    push,
    clear,
    read,
    writeConsole,
    sendBuffer

});

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__echo__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__help__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__clear__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__info__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__contact__ = __webpack_require__(8);






/* harmony default export */ __webpack_exports__["a"] = ([
    __WEBPACK_IMPORTED_MODULE_1__help__["a" /* default */], __WEBPACK_IMPORTED_MODULE_0__echo__["a" /* default */], __WEBPACK_IMPORTED_MODULE_2__clear__["a" /* default */], __WEBPACK_IMPORTED_MODULE_3__info__["a" /* default */],__WEBPACK_IMPORTED_MODULE_4__contact__["a" /* default */]
]);

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__commands__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__std__ = __webpack_require__(0);



let promptText = null;
let currentLocation = 'guest@andr.eu:~$';
let currentCommand = null;
let promptCallback = null;

function command(name, args) {
    let command = __WEBPACK_IMPORTED_MODULE_0__commands__["a" /* default */].find(x => x.name === name);
    if (typeof command === 'undefined' || command === null) 
        return __WEBPACK_IMPORTED_MODULE_1__std__["a" /* default */].push('Error, Command not found.');
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

/* harmony default export */ __webpack_exports__["a"] = ({
    onkeypress,
    setPromptText,
    setPromptCallback,
    updatePromptText
});

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__commands__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__io_std__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__io_terminal__ = __webpack_require__(2);




function AndreuOS() {

    let line = '';
    let welcomeText = [
        'Welcome to Juan C. Andreu\'s home portal.',
        'Type help for a list of commands.'
    ];    

    function init() {
        document.body.classList.add("background");
        
        __WEBPACK_IMPORTED_MODULE_1__io_std__["a" /* default */].push(welcomeText[0]);
        __WEBPACK_IMPORTED_MODULE_1__io_std__["a" /* default */].push(welcomeText[1]);
        __WEBPACK_IMPORTED_MODULE_1__io_std__["a" /* default */].sendBuffer();
        
        setTimeout(function () {
            inputtext.focus();
        }, 50);
    }


    return {
        init: init,
        onkeypress: __WEBPACK_IMPORTED_MODULE_2__io_terminal__["a" /* default */].onkeypress
    }
}

let os = new AndreuOS();
window.onload = os.init
window.onkeyup = os.onkeypress;
window.onclick = function () {
    inputtext.focus();
}


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__io_std__ = __webpack_require__(0);


/* harmony default export */ __webpack_exports__["a"] = ({
    name: 'echo', 
    description: "Displays message", 
    exec: function (args) { 
        __WEBPACK_IMPORTED_MODULE_0__io_std__["a" /* default */].push(args.join(' ')); 
    }
});

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__io_std__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1____ = __webpack_require__(1);



/* harmony default export */ __webpack_exports__["a"] = ({
    name: 'help',
    description: "Shows help",
    exec: function (args) {
        __WEBPACK_IMPORTED_MODULE_0__io_std__["a" /* default */].push("Help!")
        __WEBPACK_IMPORTED_MODULE_1____["a" /* default */].map(x => __WEBPACK_IMPORTED_MODULE_0__io_std__["a" /* default */].push("Command: " + x.name + " - " + x.description))
    }
});

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__io_std__ = __webpack_require__(0);

/* harmony default export */ __webpack_exports__["a"] = ({
    name: 'clear',
    description: "Clears the console", 
    exec: function () { __WEBPACK_IMPORTED_MODULE_0__io_std__["a" /* default */].clear(); }
});

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__io_std__ = __webpack_require__(0);

let m = "contact", m2 = "andreujuan", m3 = ['m', 'o', 'c', '.'].reverse().join('');
function getSign() { return "@"; }

/* harmony default export */ __webpack_exports__["a"] = ({
    name: 'info',
    description: "Shows Juan's Info",
    exec: function (args) {
        __WEBPACK_IMPORTED_MODULE_0__io_std__["a" /* default */].clear();

        __WEBPACK_IMPORTED_MODULE_0__io_std__["a" /* default */].push('*******************************');
        __WEBPACK_IMPORTED_MODULE_0__io_std__["a" /* default */].push('  Juan Carlos Andreu Gutiérrez   ');
        __WEBPACK_IMPORTED_MODULE_0__io_std__["a" /* default */].push('  Software Architect    ');
        __WEBPACK_IMPORTED_MODULE_0__io_std__["a" /* default */].push('  ' + m + getSign() + m2 + m3);
        __WEBPACK_IMPORTED_MODULE_0__io_std__["a" /* default */].push('  @Madrid ');
        __WEBPACK_IMPORTED_MODULE_0__io_std__["a" /* default */].push('   ');
        __WEBPACK_IMPORTED_MODULE_0__io_std__["a" /* default */].push('  Twitter: @andreujuanc ');
        __WEBPACK_IMPORTED_MODULE_0__io_std__["a" /* default */].push('  Github: /andreujuanc ');
        __WEBPACK_IMPORTED_MODULE_0__io_std__["a" /* default */].push('*******************************');
    }
});

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__io_std__ = __webpack_require__(0);


/* harmony default export */ __webpack_exports__["a"] = ({
    name: 'contact',
    description: "Contact me!",
    exec: function (args) {
        return new Promise(function (resolve, reject) {
            __WEBPACK_IMPORTED_MODULE_0__io_std__["a" /* default */].clear();
            __WEBPACK_IMPORTED_MODULE_0__io_std__["a" /* default */].writeConsole('Please fill the form:');
            let contactData = {
                Name: null,
                Email: null,
                Message: null
            };
            let chain = new Promise(function (resolve) { resolve(); });

            let readWrap = function (chain, part, times) {
                return chain.then(function () {
                    return new Promise(function (resolve, reject) {
                        __WEBPACK_IMPORTED_MODULE_0__io_std__["a" /* default */].read(part)
                            .then(function (x) {
                                if (x.length === 0) {
                                    __WEBPACK_IMPORTED_MODULE_0__io_std__["a" /* default */].push('Input must not be empty: ' + part);
                                    return readWrap(chain, part, ++times);
                                }
                                __WEBPACK_IMPORTED_MODULE_0__io_std__["a" /* default */].push(part + ': ' + x);
                                contactData[part] = x;
                            })
                            .then(resolve);
                    });
                });
            };

            for (let part in contactData) {
                chain = readWrap(chain, part, 0);
            }

            return chain
                .then(function () {
                    //let action = "https://formspree.io/" + m + getSign() + m2 + m3;
                    let action = "https://hooks.zapier.com/hooks/catch/2191755/iits0w/";
                    let form = new FormData();
                    for (let i in contactData) {
                        form.append(i.toString().toLowerCase(), contactData[i]);
                    }
                    console.log('sending', form);
                    __WEBPACK_IMPORTED_MODULE_0__io_std__["a" /* default */].push('Sending... please wait.');
                    fetch(action, {
                        method: "POST",
                        body: form
                    })
                        .then(function (response) {
                            if (response.ok)
                                __WEBPACK_IMPORTED_MODULE_0__io_std__["a" /* default */].push('Thank you ' + contactData.Name + '! I will contact you as soon as possible.');
                            else {
                                console.error(response);
                                __WEBPACK_IMPORTED_MODULE_0__io_std__["a" /* default */].push('Ups! there was an error, please use the info command and send me an email.');

                            }
                        }).catch(function (error) {
                            console.error(error);
                            __WEBPACK_IMPORTED_MODULE_0__io_std__["a" /* default */].push('Ups! there was an error, please use the info command and send me an email.');
                        });

                })
                .then(resolve);
        });
    }
});

/***/ })
/******/ ]);