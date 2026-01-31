const { test, expect } = require('@playwright/test');

const negativeCases = [
  { id: 'Neg_Fun_001', input: 'matahetaennavennenaee.', expected: 'මට හෙට එන්න වෙන්නෙ නෑ.' },
  { id: 'Neg_Fun_002', input: 'mata wathura thibahayi.', expected: 'මට වතුර තිබහයි.' },
  { id: 'Neg_Fun_003', input: 'dhasun, velaavata enna. Do not be late.', expected: 'දසුන්, වෙලාවට එන්න. Do not be late.' },
  { id: 'Neg_Fun_004', input: 'mama heta Sri Lanka yanavaa.', expected: 'මම හෙට Sri Lanka යනවා.' },
  { id: 'Neg_Fun_005', input: 'Nimal, api heta koththuvak kamudha?', expected: 'නිමල්, අපි හෙට කොත්තුවක් කමුද?' },
  { id: 'Neg_Fun_006', input: 'aeya     pansal    yanavaa.', expected: 'ඇය පන්සල් යනවා.' }, 
  { id: 'Neg_Fun_007', input: 'mama oyaagee chithrayak aDHinnadha???', expected: 'මම ඔයාගේ චිත්‍රයක් අඳින්නද?' },
  { id: 'Neg_Fun_008', input: 'api api nivasa pirisidhu kaLemu.', expected: 'අපි නිවස පිරිසිදු කළෙමු.' },
  { id: 'Neg_Fun_009', input: 'mama, vinoodha chaarikaavak giyemi.', expected: 'මම විනෝද චාරිකාවක් ගියෙමි.' },
  { id: 'Neg_Fun_010', input: 'uu good-hearted machan', expected: 'ඌ good-hearted මචන්' },
];

negativeCases.forEach(({ id, input, expected }) => {
  test(`${id} - Negative Test (Expected to Fail)`, async ({ page }, testInfo) => {
    await page.goto('https://www.swifttranslator.com/');

    const inputBox = page.locator('textarea[placeholder*="Singlish"]');
    const outputBox = page.locator('div.bg-slate-50.whitespace-pre-wrap');

    
    await inputBox.fill('');
    await inputBox.type(input, { delay: 50 });

    
    await expect(outputBox).toHaveText(/.+/, { timeout: 80000 });

    const trimmedOutput = (await outputBox.textContent()).trim();

    
    testInfo.attach('Test Data', {
      body: `Input: ${input}\nExpected Output: ${expected}\nActual Output: ${trimmedOutput}`,
      contentType: 'text/plain',
    });

    
    expect(trimmedOutput).toBe(
      expected,
      'This negative test is designed to fail because the translator is not producing the expected output'
    );
  });
});
