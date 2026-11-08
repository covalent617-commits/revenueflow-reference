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
  if (await page.locator('#roleSelect, .persona-wrap, .rolepick').count()) throw new Error('Self-service role selector must be removed from the interface.');
  if (!(await page.locator('#roleLabel').innerText()).includes('Owner')) throw new Error('Signed-in profile must show the assigned read-only membership role.');

  await page.locator('#orgSwitch').click();
  await page.locator('#workspaceMenu').waitFor({ state: 'visible' });
  if (await page.locator('#workspaceOptions [data-workspace-index]').count() !== 3) throw new Error('Workspace switcher must list only the three authorised demo memberships.');
  const workspaceMenu = await page.locator('#workspaceMenu').innerText();
  if (!workspaceMenu.includes('Nigerian Breweries') || !workspaceMenu.includes('Finance Manager') || !workspaceMenu.includes('Company C') || !workspaceMenu.includes('Sales Representative')) throw new Error('Workspace menu must show organisation and assigned role as read-only context.');
  await page.locator('[data-workspace-index="1"]').click();
  if (!(await page.locator('#roleLabel').innerText()).includes('Finance Manager')) throw new Error('Workspace switch did not load Sarah’s Finance Manager membership.');
  await go('customers');
  const nbCustomers = await page.locator('#content').innerText();
  if (!nbCustomers.includes('Nigerian Breweries Distribution') || nbCustomers.includes('Global Tech Solutions')) throw new Error('Customer records were not scoped to Nigerian Breweries.');
  await page.locator('#assistantInput').fill('Which deals need attention today?');
  await page.locator('#assistantInput').press('Enter');
  const nbAi = await page.locator('#assistantBody').innerText();
  if (!nbAi.includes('Nigerian Breweries') || !nbAi.includes('National Distribution Renewal') || nbAi.includes('Cloud Migration')) throw new Error('AI assistant did not use the active workspace opportunity context.');
  await go('settings');
  if (await page.locator('[data-action="invite-member"], [data-action="assign-role"]').count()) throw new Error('Finance Manager must not see owner/admin membership administration actions.');
  await page.locator('#orgSwitch').click();
  await page.locator('[data-workspace-index="2"]').click();
  if (!(await page.locator('#roleLabel').innerText()).includes('Sales Representative')) throw new Error('Company C membership role did not load independently.');
  await go('customers');
  const companyCCustomers = await page.locator('#content').innerText();
  if (!companyCCustomers.includes('Company C Enterprise') || companyCCustomers.includes('Nigerian Breweries Distribution')) throw new Error('Customer records leaked between Company C and Nigerian Breweries.');
  await page.locator('#orgSwitch').click();
  await page.locator('[data-workspace-index="0"]').click();
  if (!(await page.locator('#roleLabel').innerText()).includes('Owner')) throw new Error('Returning to Northstar did not restore Sarah’s Owner membership.');

  
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
      if (!(await page.locator('#modal [data-report-visual="grouped-bars"]').count())) throw new Error('Win/Loss category comparison must use grouped bars.');
      const grouped = await page.locator('#modal .grouped-bars').innerText();
      if (!grouped.includes('Won') || !grouped.includes('Lost')) throw new Error('Won and Lost series are missing from the grouped bar visual.');
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

  await go('dashboard');
  if (!(await page.locator('[data-widget="pipeline"] [data-report-visual="bars"]').count())) throw new Error('Dashboard pipeline stage comparison must use categorical bars.');

  await go('forecast');
  const points = page.locator('[data-chart-point]');
  if (await points.count() < 8) throw new Error('Forecast chart data points are missing.');
  await points.last().hover();
  await page.locator('#chartTooltip').waitFor({ state: 'visible' });
  await shot('05-forecast');

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
  let after = await page.locator('#dashboardWidgets [data-widget]').evaluateAll(nodes => nodes.map(n => n.dataset.widget).join(','));
  if (before === after) {
    await page.selectOption('#widgetOrderSelect', 'priority');
    await page.locator('[data-action="widget-order-later"]').click();
    after = await page.locator('#dashboardWidgets [data-widget]').evaluateAll(nodes => nodes.map(n => n.dataset.widget).join(','));
  }
  if (before === after) throw new Error('Dashboard widget reordering did not change widget order.');
  await shot('08-dashboard-reordered');

  // Added V2.0 platform acceptance journeys.
  await go('account');
  if (await page.locator('.workspace-account-row').count() !== 3) throw new Error('Account Command Centre must list the three accepted workspace memberships.');
  await page.locator('#accountSearch').fill('Global Tech');
  if (!(await page.locator('#accountSearchResults').innerText()).includes('Global Tech Solutions')) throw new Error('Account-level search did not return an accessible customer record.');
  await page.locator('#accountWorkspaceFilter').selectOption('1');
  await page.locator('#accountSearch').fill('Nigerian');
  if (!(await page.locator('#accountSearchResults').innerText()).includes('Nigerian Breweries Distribution')) throw new Error('Account search did not return records from the selected workspace.');
  await page.locator('#accountSearch').fill('Global Tech');
  if ((await page.locator('#accountSearchResults').innerText()).includes('Global Tech')) throw new Error('Account search leaked a record from a different workspace scope.');
  await shot('10-account-command-centre');

  await go('pricing');
  if (await page.locator('.plan-card').count() !== 4) throw new Error('Plans & Usage must show four draft workspace tiers.');
  if (!(await page.locator('#content').innerText()).includes('Pricing TBD')) throw new Error('Unapproved plan pricing must remain explicitly unset.');
  await shot('11-plans-usage');

  await go('workflows');
  const workflowText = await page.locator('#content').innerText();
  if (!workflowText.includes('Idempotency') || !workflowText.includes('Execution history') || !workflowText.includes('Awaiting approval')) throw new Error('Workflow Studio is missing governance, approvals or execution history.');
  await shot('12-workflow-studio');

  await go('documents');
  if (!(await page.locator('#content').innerText()).includes('Human review required')) throw new Error('Document Intelligence must make human verification explicit.');
  if (await page.locator('.extracted-field').count() < 5) throw new Error('Document Intelligence extraction field review is incomplete.');
  await shot('13-document-intelligence');

  await go('imports');
  await page.locator('#importFile').setInputFiles({ name: 'customers-preview.csv', mimeType: 'text/csv', buffer: Buffer.from('name,email,company\nJane Doe,jane@example.com,Acme\nJohn Doe,john@example.com,Acme') });
  await page.waitForFunction(() => { const b = document.querySelector('[data-action="import-dry-run"]'); return b && !b.disabled; });
  await page.locator('[data-action="import-dry-run"]').click();
  if (!(await page.locator('#importState').innerText()).includes('Dry run passed')) throw new Error('Valid CSV rows did not pass the import dry run.');
  await page.locator('[data-action="import-commit"]').click();
  if (!(await page.locator('#importValidation').innerText()).includes('Dry run confirmed')) throw new Error('Demo import confirmation did not preserve the no-write preview boundary.');
  await page.locator('[data-action="import-reset"]').click();
  await page.locator('#importFile').setInputFiles({ name: 'duplicates-preview.csv', mimeType: 'text/csv', buffer: Buffer.from('name,email,company\nJane Doe,jane@example.com,Acme\nJane Duplicate,jane@example.com,Acme') });
  await page.waitForFunction(() => { const b = document.querySelector('[data-action="import-dry-run"]'); return b && !b.disabled; });
  await page.locator('[data-action="import-dry-run"]').click();
  if (!(await page.locator('#importValidation').innerText()).includes('Duplicate candidates')) throw new Error('Import preview did not detect duplicate email candidates.');
  await shot('13a-import-centre');

  await go('integrations');
  await page.locator('[data-action="integration-scopes"]').first().click();
  if (!(await page.locator('#modal').innerText()).includes('Not requested')) throw new Error('Integration scope review does not show least-privilege boundaries.');
  await page.locator('#modal [data-action="close-modal"]').click();
  await page.locator('[data-action="integration-connect"]').first().click();
  await page.locator('#modal [data-action="integration-confirm-preview"]').click();
  if (!(await page.locator('#toast').innerText()).includes('No OAuth request was sent')) throw new Error('Integration preview did not clearly avoid claiming a live connection.');
  await shot('13b-integrations-api');

  await go('projects');
  await page.locator('[data-action="workspace-add-record"]').click();
  const recordInputs = page.locator('#workspaceRecordForm input');
  await recordInputs.nth(0).fill('Browser QA project');
  await recordInputs.nth(1).fill('QA Customer');
  await recordInputs.nth(2).fill('Browser QA');
  await recordInputs.nth(3).fill('Healthy');
  await recordInputs.nth(4).fill('10000');
  await recordInputs.nth(5).fill('10%');
  await page.locator('#workspaceRecordForm button[type="submit"]').click();
  if (!(await page.locator('#content').innerText()).includes('Browser QA project')) throw new Error('Workspace record creation did not persist within the preview session.');
  const recordOpenButton = page.locator('#content tbody tr').filter({ hasText: 'Browser QA project' }).locator('[data-action="workspace-record-open"]');
  await recordOpenButton.click();
  await page.locator('#modal.open').waitFor();
  if (!(await page.locator('#modal').innerText()).toLowerCase().includes('connected workspace record')) throw new Error('Workspace record detail did not open.');
  await page.locator('#modal [data-action="close-modal"]').click();
  const downloadPromise = page.waitForEvent('download');
  await page.locator('[data-action="export"]').click();
  const download = await downloadPromise;
  if (!download.suggestedFilename().includes('projects-preview.csv')) throw new Error('Workspace CSV export filename is incorrect.');
  await shot('14-projects-workspace-actions');

  await go('forecast');
  console.log('chart diagnostics:', await page.locator('#content .chartbox').count(), await page.locator('#content .chart-tools').count(), await page.locator('#content [data-chart-point]').count());
  await page.locator('#content .chart-tools [data-chart-type="grouped"]').first().click();
  if (await page.locator('#content .chartbox svg rect').count() < 8) throw new Error('Chart presentation switcher did not render grouped bars for the multi-series forecast chart.');
  await page.locator('#content .chart-tools [data-chart-type="table"]').first().click();
  if (!(await page.locator('#content .chart-table').count())) throw new Error('Chart presentation switcher did not render its accessible data table.');

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
