// import mainContent from './mainContent.md'
// import leftBar from './leftBar.md'
//import '../css/index.css'
import './index.css'
//left side
document.getElementById('about-me').innerHTML = require('./sections/about-me.md')

//main
document.getElementById('experience').innerHTML = require('./sections/experience.html').default