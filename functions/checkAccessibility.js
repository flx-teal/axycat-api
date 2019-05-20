const puppeteer = require('puppeteer');
const axeCore = require('axe-core');

module.exports = async function checkAccessibility(url) {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  let axeResult;
  try {
    await page.goto(url, { waitUntil: 'load'});
    const handle = await page.evaluateHandle(`
			// Inject axe source code
			${axeCore.source}
			// Run axe
			axe.run()
		`);

    // Get the results from `axe.run()`.
    axeResult = await handle.jsonValue();
    // Destroy the handle & return axe results.
    await handle.dispose();
    await browser.close();
  } catch (e) {
    if (browser) {
      await browser.close();
    }
    throw e;
  }
  return axeResult;
};
