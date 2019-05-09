## aves

Audio spectrum analyzer written in type script.
Developed using web audio api.

![AvesExample](./avesExample.png "スペクトラム・アナライザーサンプル")

# Installing 

Using npm:

```shell
$ npm install aves.js
```

Using yarn:

```shell
$ yarn add aves.js
```

Using CDN:

```html
<script src="https://unpkg.com/aves.js/dist/index.js"></script>
```

# Example

```js
const Aves = require('Aves.js');
aves = new Aves()
// Decode asynchronously
// Use ArrayBuffer for input audio
aves.loadAudio(audioData).then(() => {
  const canvasElm = document.querySelector('#canvas')
  const canvasWidth = 1000
  const canvasHeight = 500
  aves.createSpectrumAnalyser(canvasElm, canvasWidth, canvasHeight)
  // You got a nice spectrum analyser
  aves.start()
})
```

