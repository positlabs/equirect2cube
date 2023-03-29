#!/usr/bin/env node
/*



*/

const { transformToCubeFaces } = require('equirect-cubemap-faces-js')
const { argv } = require('yargs')
const { PNG } = require('pngjs')
const fs = require('fs')
const path = require('path')

/*
load an image file and return an object with...
  data (buffer or array of ints containing the image data in rgba format)
  width
  height
*/
function loadImage(filename) {
  return PNG.sync.read(fs.readFileSync(path.join(process.cwd(), filename)))
}
/*
save an image.
Params:
  filename
  imageData (buffer or array of ints containing the image data in rgba format)
*/
function saveImage(filename, imageData) {
  var file = PNG.sync.write(imageData, { width: outSize, height: outSize })
  fs.writeFileSync(filename, file)
}

const inFileName = argv._[0]
if (!inFileName) {
  throw new Error('You must supply a filename')
}

console.log('loading file ' + inFileName + '...')
const image = loadImage(inFileName)
console.log('loaded')

// convert the file to image data
const outSize = argv.size || 512
const imageData = image.data

const r = new Array(6)
for (let i = 0; i < 6; i++) {
  r[i] = {
    width: outSize,
    height: outSize,
    data: Buffer.alloc(4 * outSize * outSize)
  }
}

console.log('converting to cubemap (this may take a while)...')

// convert to cube faces
const faces = transformToCubeFaces({ width: image.width, height: image.height, data: imageData }, r)

console.log('converted file, now writing files...')

const outputDir = argv.out || './'
try {
  fs.mkdirSync(outputDir, {recursive: true})
}catch(e){}
const names = ['px', 'nx', 'py', 'ny', 'pz', 'nz']
names.forEach((name, i) => {
  console.log('writing file ' + (i + 1) + ' of 6')
  saveImage(path.join(outputDir, names[i] + '.png'), faces[i])
})
console.log('done!')
