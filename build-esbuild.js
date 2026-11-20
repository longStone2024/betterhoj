const esbuild = require('esbuild');
const fs = require('fs');
const path = require('path');

async function build() {
  const outFile = path.resolve(__dirname, 'betterhoj.user.js');
  
  try {
    const result = await esbuild.build({
      entryPoints: [path.resolve(__dirname, 'src/entry.ts')],
      bundle: true,
      outfile: outFile,
      format: 'iife',
      target: 'es2020',
      platform: 'browser',
      globalName: 'BetterHOJ',
      define: { 'process.env.NODE_ENV': '"development"' },
      minify: false,
      sourcemap: 'inline',
      charset: 'utf8',
      treeShaking: true,
      legalComments: 'none',
      logLevel: 'debug',
    });
    console.log('Build successful:', outFile);
    console.log('File size:', fs.statSync(outFile).size, 'bytes');
  } catch (err) {
    console.error('Build failed:');
    console.error('Error name:', err.name);
    console.error('Error message:', err.message);
    console.error('Full error:', JSON.stringify(err, Object.getOwnPropertyNames(err), 2));
    process.exit(1);
  }
}

build();