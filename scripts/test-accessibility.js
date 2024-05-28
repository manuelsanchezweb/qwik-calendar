import { AxeBuilder } from '@axe-core/playwright'
import playwright from 'playwright'
import fs from 'fs'
import path from 'path'

const ARGUMENTS_OPTIONS = {
  LOCAL: '--local',
  LIVE: '--live',
}

;(async () => {
  const argumentReceived = process.argv[2]
  let url
  if (argumentReceived === ARGUMENTS_OPTIONS.LOCAL) {
    url = 'http://localhost:5173/'
  } else if (argumentReceived === ARGUMENTS_OPTIONS.LIVE) {
    url = 'https://qwik-calendar.vercel.app/p'
  } else {
    url = argumentReceived
  }
  const currentDirectory = process.cwd()
  const browser = await playwright.chromium.launch({ headless: true })
  const context = await browser.newContext()
  const page = await context.newPage()
  await page.goto(url)

  try {
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze()

    // Prepare the content to be saved to the file
    let content = ''
    content += '//////////////////////////\n'
    content += 'These are the incomplete things we could already improve\n'
    content += '//////////////////////////\n'

    results.incomplete.forEach((incomplete) => {
      content += `\n- Incomplete rule: ${incomplete.id}\n`
      content += `${incomplete.id}\n`
      content += `${incomplete.help}\n`
      content += `Impact: ${incomplete.impact}\n`

      incomplete.nodes.forEach((node) => {
        content += `${node.html}\n`
      })
    })

    content += '\n//////////////////////////\n'
    content += 'These are the violations:\n'
    content += '//////////////////////////\n'

    results.violations.forEach((violation) => {
      content += `\n- Violation rule: ${violation.id}\n`
      content += `${violation.id}\n`
      content += `${violation.help}\n`
      content += `Impact: ${violation.impact}\n`

      violation.nodes.forEach((node) => {
        content += `${node.html}\n`
      })
    })

    // Directory and file preparation
    const testDirectory = path.join(currentDirectory, 'tests')
    // create a function to get the data in the format of YYYYMMDDHHMMSS without other letters and without - and :
    const finalDate = new Date()
      .toISOString()
      .replace(/:/g, '')
      .replace(/T/g, '')
      .replace(/Z/g, '')
      .replace(/\./g, '')
      .replace(/-/g, '')
      .replace(/ /g, '')

    const fileName = `test-accessibility-${finalDate}.txt`
    const filePath = path.join(testDirectory, fileName)

    // Ensure the directory exists
    if (!fs.existsSync(testDirectory)) {
      fs.mkdirSync(testDirectory)
    }

    // Save the content to a file
    fs.writeFileSync(filePath, content)
    console.log(`Results saved to ${filePath}`)
  } catch (e) {
    console.error('Error occurred:', e)
  }

  await browser.close()
})()
