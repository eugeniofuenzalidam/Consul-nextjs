const { chromium } = require('playwright');

async function getWeb3FormsKey() {
  console.log('🚀 Obteniendo Access Key de Web3Forms...\n');

  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  try {
    // Navigate to Web3Forms
    await page.goto('https://web3forms.com/');
    console.log('✅ Abriendo Web3Forms...');

    await page.waitForTimeout(2000);

    // Look for email input
    const emailInput = await page.locator('input[type="email"]').first();

    if (await emailInput.isVisible()) {
      await emailInput.fill('eugenionfuenzalidamujica@gmail.com');
      console.log('✅ Email ingresado: eugenionfuenzalidamujica@gmail.com');

      // Look for submit button
      const submitButton = await page.locator('button:has-text("Get Started"), button:has-text("Start Free"), button[type="submit"]').first();

      if (await submitButton.isVisible()) {
        await submitButton.click();
        console.log('✅ Formulario enviado');

        await page.waitForTimeout(3000);

        // Try to find access key on page
        const accessKeyElement = await page.locator('text=/[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}/i').first();

        if (await accessKeyElement.isVisible()) {
          const accessKey = await accessKeyElement.textContent();
          console.log('\n🎉 ¡Access Key obtenido!');
          console.log('📋 Access Key:', accessKey);
          console.log('\n📧 También revisa tu email: eugenionfuenzalidamujica@gmail.com');

          // Save to file
          const fs = require('fs');
          fs.writeFileSync('/Users/eugeniofuenzalida/projects/Fuenzalida Consulting/consul-nextjs/WEB3FORMS_KEY.txt', accessKey);
          console.log('💾 Guardado en: WEB3FORMS_KEY.txt');

          return accessKey;
        } else {
          console.log('\n📧 Access Key será enviado a tu email: eugenionfuenzalidamujica@gmail.com');
          console.log('⏳ Espera 1-2 minutos y revisa tu bandeja de entrada');
        }
      }
    }

    console.log('\n⏳ Mantén el navegador abierto por 30 segundos...');
    await page.waitForTimeout(30000);

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await browser.close();
  }
}

getWeb3FormsKey();
