const puppeteer = require('puppeteer')
var yargs = require('yargs')
const path = require('path')

const argv = yargs(process.argv.slice(2))
  .usage('$0 [options] <url>', 'Take a screenshot of a webpage', (yargs) => {
    yargs
      .positional('url', {
          description:
              'Url of the webpage you want to take a screenshot of',
          type: 'string',
      })
      .option('width', {
        description: 'Viewport width',
        type: 'number',
        demandOption: false,
        default: 1920,
      })
      .option('height', {
          description: 'Viewport height',
          type: 'number',
          demandOption: false,
          default: 1080,
      })
      .option('outputDir', {
        description: 'Output directory, defaults to current directory',
        type: 'string',
        demandOption: false,
        default: './output',
      })
      .option('filename', {
          description: 'Filename of the produced screenshot',
          type: 'string',
          demandOption: false,
          default: 'screenshot',
      })
      .option('format', {
          description: 'Image format of the screenshot',
          type: 'string',
          choices: ['png', 'jpeg'],
          demandOption: false,
          default: 'png',
      })
      .example(
          '$0 https://github.com',
          'Take a screenshot of https://github.com and save it as screenshot.png'
      )
      .example(
        '$0 --filename=mysite --format=jpeg https://github.com',
        'Take a screenshot of https://github.com and save it as mysite.jpeg'
      )
    })
    .argv

takeScreenshot(argv)

function takeScreenshot(argv) {
  (async () => {
    const browser = await puppeteer.launch({
      defaultViewport: {
          width: argv.width,
          height: argv.height,
      },
      bindAddress: '0.0.0.0',
      args: [
          '--no-sandbox',
          '--headless',
          '--disable-gpu',
          '--disable-dev-shm-usage',
          '--remote-debugging-port=9222',
          '--remote-debugging-address=0.0.0.0',
      ],
    })
    const page = await browser.newPage()
    await page.goto(argv.url, {
      waitUntil: 'networkidle0',
    })

    try {
      await page.waitForSelector('.qc-cmp2-summary-buttons', { visible: true, timeout: 3000 })
      await page.click('.qc-cmp2-summary-buttons > button[mode="primary"]')
    } catch (error) {
      console.error('No CMP found. Skipping click...');
    }

    await page.screenshot({
      path: path
        .join(argv.outputDir, argv.filename + '.' + argv.format)
        .toString(),
      type: argv.format,
    })
    await browser.close()
  })()
}