import spectrumCanvas from './spectrumCanvas'
import audioSpectrum from './audioSpectrum'

export default class {
  private _canvas: spectrumCanvas
  private _analyzer: audioSpectrum
  constructor(audioData: ArrayBuffer) {
    console.log(audioData)
    this._canvas = new spectrumCanvas()
    this.init(audioData)
  }

  init(audioData: ArrayBuffer) {
    this._analyzer = new audioSpectrum()
    this._analyzer.decodeAudio(audioData).then(() => {
      console.log('decodeAudio');
      
      this._analyzer.start()
      this._canvas.draw(this._analyzer)
    })
  }
}
// import AnalyzerNode from './audioSpectrum'

// function init() {
//   
//   
//   const elm = document.querySelector('#start')
//   elm.addEventListener('click', function() {
//     var request = new XMLHttpRequest()
//     const url = 'sample.mp3'
//     request.open('GET', url, true)
//     request.responseType = 'arraybuffer'

//     // Decode asynchronously
//     request.onload = function() {
//       const audioData: ArrayBuffer = request.response
//       audioLoad(audioData)
//     }
//     request.send()
//   })
//   
//   function audioLoad(audioData: ArrayBuffer) {
//     
//   }
// }

// window.onload = init
