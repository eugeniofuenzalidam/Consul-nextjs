const { chromium } = require('playwright');

async function setupWeb3Forms() {
  console.log('🚀 Setting up Web3Forms...');

  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    // Navigate to Web3Forms
    await page.goto('https://web3forms.com/');
    console.log('📝 Opened Web3Forms website');

    // Look for the "Get Started" or email input
    await page.waitForSelector('input[type="email"], input[name="email"]', { timeout: 10000 });

    // Fill in email
    await page.fill('input[type="email"], input[name="email"]', 'eugenionfuenzalidamujica@gmail.com');
    console.log('✉️  Filled email: eugenionfuenzalidamujica@gmail.com');

    // Find and click submit button
    const submitButton = await page.locator('button:has-text("Get Started"), button:has-text("Submit"), button[type="submit"]').first();
    await submitButton.click();
    console.log('✅ Clicked submit button');

    // Wait for success message or access key
    await page.waitForTimeout(3000);

    // Try to extract access key if visible on page
    const accessKeyElement = await page.locator('text=/[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}/i').first();

    if (await accessKeyElement.isVisible()) {
      const accessKey = await accessKeyElement.textContent();
      console.log('🔑 Access Key found:', accessKey);
      return accessKey;
    } else {
      console.log('📧 Access Key will be sent to your email: eugenionfuenzalidamujica@gmail.com');
      console.log('Please check your email and paste the Access Key when ready.');
    }

    // Keep browser open for manual interaction if needed
    console.log('\n⏳ Browser will stay open for 60 seconds for manual interaction...');
    await page.waitForTimeout(60000);

  } catch (error) {
    console.error('❌ Error during Web3Forms setup:', error.message);
    console.log('\n📧 Please manually sign up at https://web3forms.com/ with: eugenionfuenzalidamujica@gmail.com');
  } finally {
    await browser.close();
  }
}

async function setupGoogleCalendar() {
  console.log('\n🗓️  Setting up Google Calendar API...');
  console.log('Opening Google Cloud Console...');

  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    // Navigate to Google Cloud Console
    await page.goto('https://console.cloud.google.com/');
    console.log('📝 Opened Google Cloud Console');

    console.log('\n📋 Manual Steps Required:');
    console.log('1. Sign in with: eugenionfuenzalidamujica@gmail.com');
    console.log('2. Create a new project or select existing "fuenzalida-consulting"');
    console.log('3. Enable Google Calendar API');
    console.log('4. Create OAuth 2.0 credentials');
    console.log('5. Add authorized redirect URI: https://consul-nextjs.vercel.app/api/calendar/callback');
    console.log('6. Download the credentials JSON');

    console.log('\n⏳ Browser will stay open for 5 minutes for setup...');
    await page.waitForTimeout(300000); // 5 minutes

  } catch (error) {
    console.error('❌ Error during Google Calendar setup:', error.message);
  } finally {
    await browser.close();
  }
}

async function main() {
  console.log('🎯 Starting Integration Setup for Fuenzalida Consulting\n');

  // Step 1: Web3Forms
  await setupWeb3Forms();

  // Step 2: Google Calendar API
  const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  });

  readline.question('\nDo you want to set up Google Calendar API now? (y/n): ', async (answer) => {
    if (answer.toLowerCase() === 'y') {
      await setupGoogleCalendar();
    }

    console.log('\n✅ Setup process completed!');
    console.log('Next steps:');
    console.log('1. Check email for Web3Forms Access Key');
    console.log('2. Save Google Calendar credentials');
    console.log('3. Run: npm run integrate');

    readline.close();
    process.exit(0);
  });
}

main();
