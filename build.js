const esbuild = require('esbuild');
const esbuildPluginTsc = require('esbuild-plugin-tsc');

esbuild.build({
  platform: 'node',
  logLevel: 'info',
  entryPoints: ['src/index.ts'],
  bundle: true,
  outfile: 'dist/index.js',
  plugins: [
    esbuildPluginTsc(),
  ]
})
  .catch(() => process.exit(1));