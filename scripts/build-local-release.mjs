import { cp, mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const sourceDirectory = resolve(projectRoot, 'docs');
const outputDirectory = resolve(projectRoot, 'local-release');
const sourceIndexPath = resolve(sourceDirectory, 'index.html');
const outputIndexPath = resolve(outputDirectory, 'index.html');
const wifiPassword = process.env.VILA_PALMEIRA_WIFI_PASSWORD;
const wifiPasswordMarker = /<dd\b[^>]*data-wifi-password[^>]*>[\s\S]*?<\/dd>/;

function escapeHtml(value) {
  return value.replace(/[&<>'"]/g, (character) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    "'": '&#39;',
    '"': '&quot;',
  }[character]));
}

await mkdir(outputDirectory, { recursive: true });
await cp(sourceDirectory, outputDirectory, { recursive: true, force: true });

if (wifiPassword) {
  const sourceHtml = await readFile(sourceIndexPath, 'utf8');
  if (!wifiPasswordMarker.test(sourceHtml)) {
    throw new Error('Could not find the Wi-Fi password marker in docs/index.html');
  }

  const configuredHtml = sourceHtml.replace(
    wifiPasswordMarker,
    () => `<dd class="wifi-password" data-wifi-password><code>${escapeHtml(wifiPassword)}</code></dd>`,
  );
  await writeFile(outputIndexPath, configuredHtml, 'utf8');
}

console.log(`Local release generated at ${outputDirectory}`);
console.log(`Wi-Fi password configured: ${wifiPassword ? 'yes' : 'no (public fallback retained)'}`);
