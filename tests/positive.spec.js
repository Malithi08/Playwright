const { test, expect } = require('@playwright/test');

const positiveCases = [
  { id: 'Pos_Fun_001', input: 'mama redhi soodhanavaa.', expected: 'මම රෙදි සෝදනවා.' },
  { id: 'Pos_Fun_002', input: 'api saruQQgal yavanavaa saha passe naanna vaevata yanavaa.', expected: 'අපි සරුංගල් යවනවා සහ පස්සෙ නාන්න වැවට යනවා.' },
  { id: 'Pos_Fun_003', input: 'mata vaedata enna baeri vunee asaniipa vuna nisaa.', expected: 'මට වැඩට එන්න බැරි වුනේ අසනීප වුන නිසා.' },
  { id: 'Pos_Fun_004', input: 'oyaage potha mata dhenna puLuvandha?', expected: 'ඔයාගෙ පොත මට දෙන්න පුළුවන්ද?' },
  { id: 'Pos_Fun_005', input: 'dhora vahanna.', expected: 'දොර වහන්න.' },
  { id: 'Pos_Fun_006', input: 'oyaagee nirmaaNaya lassanata thiyenavaa.', expected: 'ඔයාගේ නිර්මාණය ලස්සනට තියෙනවා.' },
  { id: 'Pos_Fun_007', input: 'oyaata kisima dheyak theerenne naehae.', expected: 'ඔයාට කිසිම දෙයක් තේරෙන්නෙ නැහැ.' },
  { id: 'Pos_Fun_008', input: 'budhu saraNayi oyaata!', expected: 'බුදු සරණයි ඔයාට!' },
  { id: 'Pos_Fun_009', input: 'karuNaakaralaa mata vathura tikak dhenna.', expected: 'කරුණාකරලා මට වතුර ටිකක් දෙන්න.' },
  { id: 'Pos_Fun_010', input: 'hari, mama udhav karannam.', expected: 'හරි, මම උදව් කරන්නම්.' },
  { id: 'Pos_Fun_011', input: 'samaavenna, eya varadhavaa vatahaa gaeniimak.', expected: 'සමාවෙන්න, එය වරදවා වටහා ගැනීමක්.' },
  { id: 'Pos_Fun_012', input: 'ohoma hitapan.', expected: 'ඔහොම හිටපන්.' },
  { id: 'Pos_Fun_013', input: 'mata mahansiyi.', expected: 'මට මහන්සියි.' },
  { id: 'Pos_Fun_014', input: 'naevatha enna', expected: 'නැවත එන්න' },
  { id: 'Pos_Fun_015', input: 'ovun tika tika gamanaanthayata LaGAa vunaa.', expected: 'ඔවුන් ටික ටික ගමනාන්තයට ළඟා වුනා.' },
  { id: 'Pos_Fun_016', input: 'api iiye Galle giyaa.', expected: 'අපි ඊයෙ Galle ගියා.' },
  { id: 'Pos_Fun_017', input: 'mata haemadheema epaa velaa thiyennee.', expected: 'මට හැමදේම එපා වෙලා තියෙන්නේ.' },
  { id: 'Pos_Fun_018', input: 'puLuvannam oyaagee WhatsApp number eka mata dhenna.', expected: 'පුළුවන්නම් ඔයාගේ WhatsApp number එක මට දෙන්න.' },
  { id: 'Pos_Fun_019', input: 'ruvan Negombo vala iDHAn Zoom meeting ekata join velaa thiyennee.', expected: 'රුවන් Negombo වල ඉඳන් Zoom meeting එකට join වෙලා තියෙන්නේ.' },
  { id: 'Pos_Fun_020', input: 'budhDhimaa ATM card eka insert karaata PIN eka mathaka naethilu.', expected: 'බුද්ධිමා ATM card එක insert කරාට PIN එක මතක නැතිලු.' },
  { id: 'Pos_Fun_021', input: 'oyaa janavaari 5 havasa Rs.8000k withdraw karaadha?', expected: 'ඔයා ජනවාරි 5 හවස Rs.8000ක් withdraw කරාද?' },
  { id: 'Pos_Fun_022', input: 'oyaa adha SLIIT ekata enavaanam, api assignment eka complete karamu.', expected: 'ඔයා අද SLIIT එකට එනවානම්, අපි assignment එක complete කරමු.' },
  { id: 'Pos_Fun_023', input: 'supirii sudhdhaa! eeka patta!', expected: 'සුපිරී සුද්දා! ඒක පට්ට!' },
  { id: 'Pos_Fun_024', input: 'machan api heta udhee 6.00 vedhdhi pitath vemu. Bag kalinma pack karala thiyanna. mathaka aethuva phone ekath charge karaganna. Please make sure to come on time. mQQ udheeta call ekak dhaannam.', expected: 'මචන් අපි හෙට උදේ 6.00 වෙද්දි පිටත් වෙමු. Bag කලින්ම pack කරල තියන්න. මතක ඇතුව phone එකත් charge කරගන්න. Please make sure to come on time. මං උදේට call එකක් දාන්නම්.' },
];

positiveCases.forEach(({ id, input, expected }) => {
  test(id, async ({ page }, testInfo) => {

    test.setTimeout(120000); 

    await page.goto('https://www.swifttranslator.com/');

    const inputBox = 'textarea[placeholder*="Singlish"]';
    const outputBox = 'div.bg-slate-50.whitespace-pre-wrap';

    await page.click(inputBox);
    await page.fill(inputBox, '');
    await page.type(inputBox, input, { delay: 50 });

    await page.waitForFunction(
      (selector) => {
        const el = document.querySelector(selector);
        return el && el.textContent.trim().length > 0;
      },
      outputBox,
      { timeout: 120000 }
    );

    const output = await page.textContent(outputBox);
    const normalized = output.replace(/\s+/g, ' ').trim();

    testInfo.attach('Test Data', {
      body: `Input: ${input}\nExpected: ${expected}\nActual Output: ${normalized}`,
      contentType: 'text/plain',
    });

    expect(normalized).toBe(expected);
  });
});
