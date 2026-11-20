/**
 * Build script for Better HOJ userscript
 * Bundles TypeScript modules and injects metadata header
 */

const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const isProd = process.argv.includes('--prod');
const outDir = path.resolve('dist');
const outFile = path.resolve(outDir, 'betterhoj.user.js');
const metaFile = path.resolve('src/meta.json');

function main() {
  console.log('[Build] Starting build' + (isProd ? ' (production)' : ''));

  // Ensure dist directory exists
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  // Run esbuild via its Node API（避免依赖 .bin 下与平台绑定的二进制）
  console.log('[Build] Running esbuild...');
  let esbuild;
  try {
    esbuild = require('esbuild');
  } catch (e) {
    console.error('[Build] 无法加载 esbuild，请先执行 npm install');
    console.error(e && e.message ? e.message : e);
    process.exit(1);
  }

  const result = esbuild.buildSync({
    entryPoints: [path.resolve('src/entry.ts')],
    bundle: true,
    outfile: outFile,
    format: 'iife',
    target: 'es2020',
    platform: 'browser',
    globalName: 'BetterHOJ',
    define: {
      'process.env.NODE_ENV': isProd ? '"production"' : '"development"'
    },
    minify: !!isProd,
    sourcemap: isProd ? false : 'inline',
    charset: 'utf8',
    treeShaking: true,
    keepNames: true,
    legalComments: 'none',
    logLevel: 'warning'
  });

  if (result.warnings && result.warnings.length) {
    result.warnings.forEach(w => {
      const loc = w.location ? ` (${w.location.file}:${w.location.line})` : '';
      console.warn('[Build] Warning:', w.text + loc);
    });
  }

  // Read generated bundle
  let bundle = fs.readFileSync(outFile, 'utf-8');

  // Read metadata
  const meta = JSON.parse(fs.readFileSync(metaFile, 'utf-8'));

  // Generate metadata header
  const header = generateMetadataHeader(meta);

  // Inject header at the beginning
  bundle = header + '\n' + bundle;

  // Write final file
  fs.writeFileSync(outFile, bundle, 'utf-8');

  console.log('[Build] Complete:', outFile);
  console.log('[Build] Size:', (bundle.length / 1024).toFixed(1), 'KB');
}

function generateMetadataHeader(meta) {
  const lines = ['// ==UserScript=='];

  // Basic fields
  addField(lines, 'name', meta.name);
  addField(lines, 'namespace', meta.namespace);
  addField(lines, 'icon', meta.icon);
  addField(lines, 'version', meta.version);
  addField(lines, 'description', meta.description);
  addField(lines, 'author', meta.author);
  addField(lines, 'license', meta.license);

  // Match patterns
  meta.match.forEach(function(m) { lines.push('// @match        ' + m); });

  // Grants
  meta.grant.forEach(function(g) { lines.push('// @grant        ' + g); });

  // Run-at
  addField(lines, 'run-at', meta['run-at']);

  // Requires
  if (meta.require) {
    meta.require.forEach(function(r) { lines.push('// @require      ' + r); });
  }

  // Resources
  if (meta.resource) {
    Object.entries(meta.resource).forEach(function(_ref) {
      var name = _ref[0], url = _ref[1];
      lines.push('// @resource     ' + name + '   ' + url);
    });
  }

  // Connect
  if (meta.connect) {
    meta.connect.forEach(function(c) { lines.push('// @connect      ' + c); });
  }

  lines.push('// ==/UserScript==');

  return lines.join('\n');
}

function addField(lines, key, value) {
  var paddedKey = key.padEnd ? key.padEnd(13) : key + ' '.repeat(13 - key.length);
  lines.push('// @' + paddedKey + ' ' + value);
}

main();