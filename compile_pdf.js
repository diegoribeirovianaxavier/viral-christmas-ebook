const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

async function compilePDF() {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
  const executablePath = fs.existsSync(chromePath) ? chromePath : edgePath;

  console.log(`Using browser engine: ${executablePath}`);

  const browser = await puppeteer.launch({
    executablePath,
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-web-security',
      '--allow-file-access-from-files',
      '--font-render-hinting=none'
    ]
  });

  const page = await browser.newPage();
  
  // Set viewport to standard 8.5 x 11 inch at 96 DPI = 816 x 1056
  await page.setViewport({ width: 816, height: 1056, deviceScaleFactor: 2 });

  const htmlPath = path.join(__dirname, 'ebook.html');
  const fileUrl = 'file:///' + htmlPath.replace(/\\/g, '/');
  console.log(`Loading HTML: ${fileUrl}`);

  await page.goto(fileUrl, { waitUntil: ['load', 'networkidle0'], timeout: 90000 });

  // Wait for Google Fonts
  await page.evaluate(async () => {
    await document.fonts.ready;
  });

  // Verify all 41 images loaded in the DOM
  const imageStatus = await page.evaluate(() => {
    const images = Array.from(document.querySelectorAll('img'));
    let loaded = 0;
    let broken = [];
    images.forEach(img => {
      if (img.complete && img.naturalWidth > 0) {
        loaded++;
      } else {
        broken.push(img.src);
      }
    });
    const pageCount = document.querySelectorAll('.page').length;
    return { total: images.length, loaded, broken, pageCount };
  });

  console.log(`DOM Image Check: ${imageStatus.loaded} / ${imageStatus.total} images loaded successfully.`);
  if (imageStatus.broken.length > 0) {
    console.error('[WARNING] Broken images detected:', imageStatus.broken);
  }

  console.log(`Total Pages in Document: ${imageStatus.pageCount}`);

  const outputPath = path.join(__dirname, 'Christmas_Dinner_Feast_40_Recipes.pdf');
  console.log(`Rendering PDF: ${outputPath}`);

  await page.pdf({
    path: outputPath,
    format: 'Letter',
    printBackground: true,
    preferCSSPageSize: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 }
  });

  await browser.close();

  const stats = fs.statSync(outputPath);
  console.log(`\n[SUCCESS] Christmas_Dinner_Feast_40_Recipes.pdf successfully generated!`);
  console.log(`File Size: ${(stats.size / 1024 / 1024).toFixed(2)} MB`);
}

compilePDF().catch(err => {
  console.error('Error compiling PDF:', err);
  process.exit(1);
});
