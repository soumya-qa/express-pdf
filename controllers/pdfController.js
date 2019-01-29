const puppeteer = require('puppeteer');
const convertHTMLToPDF = require("pdf-puppeteer");
 
exports.generatePDFFromURL =  async(req, res) => {
    /**
     *  Usage
     *  @param url - This is the url of the page to be generated as pdf
     *  @param [pageFormat] - Optional parameter to pass page format default is A4
     *  @param [marginTop] - Optional parameter to pass top margin of PDF
     *  @param [marginBottom] - Optional parameter to pass bottom margin of PDF
     *  @param [marginLeft] - Optional parameter to pass left margin of PDF
     *  @param [marginRight] - Optional parameter to pass right margin of PDF
     */
    let url = req.body.url;
    // These are optional parameters.
    let pageFormat = (req.body.pageFormat) ? req.body.pageFormat : 'A4';
    let marginTop = (req.body.marginTop) ? req.body.marginTop : 0;
    let marginBottom = (req.body.marginBottom) ? req.body.marginBottom : 0;
    let marginLeft = (req.body.marginLeft) ? req.body.marginLeft : 0;
    let marginRight = (req.body.marginRight) ? req.body.marginRight : 0;

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url, {waitUntil: 'networkidle2'});
  
    // This will save file in the disk.
    //await page.pdf({path: '4d.pdf', format: 'A4', printBackground: true});

    // This won't save in the disk will save in buffer.
    const buffer = await page.pdf({format: pageFormat, printBackground: true,margin: {
        top: marginTop, right: marginRight, bottom: marginBottom, left: marginLeft
    }
    });
 
    await browser.close();
    res.setHeader("Content-Type", "application/pdf");
    res.send(buffer);
}


exports.generatePDFFromHTML = async (req, res) => {
    /**
    *    Usage
    *    @param html - This is the html to be converted to a pdf
    *    @param callback - Do something with the PDF
    *    @param [options] - Optional parameter to pass in Puppeteer PDF options
    *    @param [puppeteerArgs] - Optional parameter to pass in Puppeter arguments
    *    @param [remoteContent] - Default true. Optional parameter to specify if there is no remote content. Performance will be opitmized for no remote content.
    */
    let html = req.body.html;
    
    let options = {format: 'A4', printBackground: true};
    await convertHTMLToPDF(html, (pdf) => {
        res.setHeader("Content-Type", "application/pdf");
        res.send(pdf);
    }, options);
    
}

