const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  fs.mkdirSync('artifacts', { recursive: true });
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 1 });
  const pageErrors = [];
  page.on('pageerror', error => pageErrors.push(error.message));
  const base = 'http://127.0.0.1:4173';
  const go = async route => {
    await page.locator('.navbtn[data-page="' + route + '"]').click();
    await page.locator('#content h1').first().waitFor();
    await page.waitForTimeout(120);
  };
  const shot = async name => page.screenshot({ path: 'artifacts/' + name + '.png', fullPage: true });

  await page.goto(base, { waitUntil: 'networkidle' });
  await page.locator('#content h1').waitFor();
  await shot('01-dashboard');

  await page.selectOption('#roleSelect', 'Member');
  await go('cfo');
  if (!(await page.locator('#content h1').innerText()).includes('CFO Dashboard')) throw new Error('CFO preview was not accessible for the Member demo persona.');
  if (await page.locator('#content').innerText().then(t => t.includes('Access required'))) throw new Error('CFO preview showed an artificial restriction.');
  await shot('02-cfo-dashboard');

  await go('leak');
  if (await page.locator('[data-leaktab]').count() !== 3) throw new Error('Leak Radar must expose exactly three primary tabs.');
  if (!(await page.locator('.risk-ring svg').count())) throw new Error('Leak Radar severity ring is missing.');
  await shot('03-leak-radar');

  await go('analytics');
  if (await page.locator('[data-analyticstab]').count() !== 2) throw new Error('Analytics should expose report library and simulator, not a Forecast tab.');
  await shot('04-analytics-library');
  for (const reportIndex of [0, 2, 8]) {
    await page.locator('[data-report="' + reportIndex + '"]').click();
    await page.locator('#modal [data-report-visual]').waitFor();
    if (await page.locator('#modal .report-metrics .kpi').count() !== 4) throw new Error('Analytics report metrics are missing or generic.');
    if (reportIndex === 0) {
      if (await page.locator('#modal [data-chart-point]').count() !== 24) throw new Error('Revenue Intelligence must plot three labelled monthly series.');
      const legend = await page.locator('#modal .chart-legend').innerText();
      if (!legend.includes('Booked revenue') || !legend.includes('Invoiced revenue') || !legend.includes('Cash collected')) throw new Error('Revenue Intelligence series legend is incomplete.');
      await shot('04a-analytics-revenue-intelligence');
    }
    if (reportIndex === 2) {
      if (!(await page.locator('#modal [data-report-visual="donut"]').count())) throw new Error('Win/Loss must use a distinct outcome distribution visual.');
      const donut = await page.locator('#modal .donut').getAttribute('aria-label');
      if (!donut.includes('Won') || !donut.includes('Lost')) throw new Error('Won and Lost labels are missing from the outcome visual.');
      await shot('04b-analytics-win-loss');
    }
    if (reportIndex === 8) {
      if (await page.locator('#modal [data-chart-point]').count() !== 24) throw new Error('Forecast Analysis must plot actual, weighted forecast and target series.');
      const legend = await page.locator('#modal .chart-legend').innerText();
      if (!legend.includes('Booked actual') || !legend.includes('Weighted forecast') || !legend.includes('Target')) throw new Error('Forecast Analysis legend is incomplete.');
      await shot('04c-analytics-forecast-analysis');
    }
    await page.locator('#modal [data-action="close-modal"]').click();
  }
  for (let reportIndex = 0; reportIndex < 12; reportIndex++) {
    await page.locator('[data-report="' + reportIndex + '"]').click();
    await page.locator('#modal [data-report-visual]').waitFor();
    if ((await page.locator('#modal').innerText()).includes('index points')) throw new Error('Generic index-point chart remains in report ' + reportIndex + '.');
    await page.locator('#modal [data-action="close-modal"]').click();
  }

  await go('forecast');
  const points = page.locator('[data-chart-point]');
  if (await points.count() < 8) throw new Error('Forecast chart data points are missing.');
  await points.last().hover();
  await page.locator('#chartTooltip').waitFor({ state: 'visible' });
  await shot('05-forecast');

  await page.selectOption('#roleSelect', 'Owner');
  await go('settings');
  if (!(await page.locator('#content').innerText()).includes('The organisation itself never has an employee role')) throw new Error('Settings identity model explanation is missing.');
  await page.locator('[data-action="invite-member"]').click();
  await page.locator('#inviteName').fill('Browser Test Member');
  await page.locator('#inviteEmail').fill('browser-test@example.invalid');
  await page.locator('#inviteRole').selectOption({ label: 'Finance Manager' });
  await page.locator('[data-action="save-invitation"]').click();
  if (!(await page.locator('#content').innerText()).includes('Browser Test Member')) throw new Error('Demo invitation did not add a pending membership row.');
  await page.locator('[data-action="assign-role"]').first().click();
  await page.locator('#assignRole').selectOption({ label: 'Finance Manager' });
  await page.locator('[data-action="save-role-assignment"]').click();
  if (!(await page.locator('#content').innerText()).includes('Finance Manager')) throw new Error('Demo membership role assignment did not render.');
  await shot('06-settings-memberships');

  await page.selectOption('#currencySetting', 'NGN');
  await go('cfo');
  const cfoText = await page.locator('#content').innerText();
  if (!cfoText.includes('₦')) throw new Error('NGN display did not use the Nigerian naira symbol.');
  if (!cfoText.includes('Monthly payments reconciled as received · NGN')) throw new Error('CFO chart subtitle did not follow the organisation currency.');
  await shot('07-cfo-naira');
  await go('analytics');
  await page.locator('[data-report="0"]').click();
  if (!(await page.locator('#modal').innerText()).includes('₦')) throw new Error('Analytics report currency did not follow NGN.');
  if (!(await page.locator('#modal [data-chart-unit="NGN"]').count())) throw new Error('Analytics chart unit label did not follow NGN.');
  await shot('07a-analytics-naira');
  await page.locator('#modal [data-action="close-modal"]').click();

  await go('dashboard');
  const before = await page.locator('#dashboardWidgets [data-widget]').evaluateAll(nodes => nodes.map(n => n.dataset.widget).join(','));
  await page.locator('[data-widget="priority"]').dragTo(page.locator('[data-widget="pipeline"]'));
  const after = await page.locator('#dashboardWidgets [data-widget]').evaluateAll(nodes => nodes.map(n => n.dataset.widget).join(','));
  if (before === after) throw new Error('Dashboard drag-and-drop did not change widget order.');
  await shot('08-dashboard-reordered');

  const mobile = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1, isMobile: true, hasTouch: true });
  mobile.on('pageerror', error => pageErrors.push('mobile: ' + error.message));
  await mobile.goto(base, { waitUntil: 'networkidle' });
  await mobile.locator('#content h1').waitFor();
  await mobile.screenshot({ path: 'artifacts/09-mobile-dashboard.png', fullPage: true });

  if (pageErrors.length) throw new Error('Browser runtime errors: ' + pageErrors.join(' | '));
  await browser.close();
  console.log('Browser smoke checks passed. Screenshots saved to artifacts/.');
})().catch(error => {
  console.error(error);
  process.exit(1);
});
