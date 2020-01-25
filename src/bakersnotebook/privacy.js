// @ts-ignore
import htmlContent from './privacy.md';
import '../css/index.css'
const contentDiv = document.getElementById('content');
if(contentDiv == null){
    throw "Could not find the content node"
}
contentDiv.innerHTML = htmlContent;