# equirect2cube
NodeJS CLI tool for converting equirectangular panoramic images to cubemaps.

<img src='https://raw.githubusercontent.com/positlabs/equirect2cube/main/equirect.png' width="300">
<img src='https://raw.githubusercontent.com/positlabs/equirect2cube/main/faces.png' width="300">

## Usage

Install it: `npm install -S equirect2cube`

```sh
npx equirect2cube equirect.png --size 1024 --out ./tmp/
```

The command will create a png for each face of the cube (px.png, nx.png, py.png, ny.png, pz.png, nz.png) in the output folder (or the folder the command was executed in, if none is specified).

Note that the input image must be a png. 

## Attribution

The demo image was created with [Blockade Labs skybox generator](https://skybox.blockadelabs.com/).

The project was forked from https://github.com/fenwick67/equirectangular-to-cubemap