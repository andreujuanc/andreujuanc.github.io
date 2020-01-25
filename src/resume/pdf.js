const puppeteer = require('puppeteer')
const fs = require('fs')

async function printPDF() {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto('http://localhost:8080/resume', { waitUntil: 'networkidle0' });
    const pdf = await page.pdf(
        {
            format: 'A4',
            
        }
    );

    await browser.close();
    return pdf;
}

printPDF().then(x => {
    fs.writeFile('./dist/resume.pdf', x, (err) => {

        if (err) console.err(err)
    })
})
