const puppeteer = require('puppeteer');

module.exports = async function generatePdf(id) {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  let result;

  try {
    await page.goto(`https://axy-cat-dashboard.web.app/report-for-pdf/${id}/issues`, { waitUntil: 'networkidle2'});
    result = await page.pdf({path: 'report.pdf', format: 'A4', printBackground: true});
    await browser.close();
  } catch (e) {
    if (browser) {
      await browser.close();
    }
    throw e;
  }
  return result;
};
