const { test, expect } = require('@playwright/test');

test('Pos_UI_001 - Clearing input clears Sinhala output (Slow Motion)', async ({ page }, testInfo) => {
  await page.goto('https://www.swifttranslator.com/');

  const inputBox = page.locator('textarea[placeholder*="Singlish"]');
  const outputBox = page.locator('div.bg-slate-50.whitespace-pre-wrap');

  
  const sampleInput = 'mata kaNagaatuyi.';
  await inputBox.fill('');
  await inputBox.type(sampleInput, { delay: 50 }); 

  
  await expect(outputBox).toHaveText(/.+/, { timeout: 60000 });
  const initialOutput = (await outputBox.textContent()).trim();

  
  testInfo.attach('Initial Output', {
    body: `Input: ${sampleInput}\nOutput: ${initialOutput}`,
    contentType: 'text/plain',
  });

  
  await page.waitForTimeout(5000);

  
  await inputBox.fill('');

  
  await page.waitForTimeout(5000);

  const clearedOutput = (await outputBox.textContent()).trim();
  testInfo.attach('After Clearing Input', {
    body: `Input cleared.\nOutput after clearing: "${clearedOutput}"`,
    contentType: 'text/plain',
  });

  
  expect(clearedOutput).toBe(
    '',
    'Output should be empty immediately after input is cleared'
  );
});
