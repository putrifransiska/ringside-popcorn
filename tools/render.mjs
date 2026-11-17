// Renders the logo SVG to a PNG with resvg. usage: NODE_PATH=<node_modules> node tools/render.mjs <in.svg> <out.png> [width]
import { readFileSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
const require = createRequire(process.env.NODE_PATH ? process.env.NODE_PATH + '/' : import.meta.url);
const { Resvg } = require('@resvg/resvg-js');
const [input, output, width = '1024'] = process.argv.slice(2);
const png = new Resvg(readFileSync(input, 'utf8'), { fitTo: { mode: 'width', value: Number(width) }, font: { loadSystemFonts: true } }).render().asPng();
writeFileSync(output, png);
console.log(output, png.length, 'bytes');
