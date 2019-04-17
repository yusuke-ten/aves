import spectrumCanvas from './spectrumCanvas'
import audioSpectrum from './audioSpectrum'
export default class {
  private _canvasWidth: number = 500
  private _canvasHeight: number = 500
  private _canvasElm: HTMLCanvasElement
  private _canvasCtx: CanvasRenderingContext2D

  constructor() {
    this._canvasElm = document.querySelector('#canvas')
    this._canvasCtx = this._canvasElm.getContext('2d')
    this._canvasCtx.clearRect(0, 0, this._canvasWidth, this._canvasHeight)
  }
  draw(analyzer: audioSpectrum) {
    console.log('draw');
    
    let drawVisual = requestAnimationFrame(() => this.draw(analyzer))

    analyzer._analyser.getByteFrequencyData(analyzer._dataArray)

    this._canvasCtx.fillStyle = 'rgb(0, 0, 0)'
    this._canvasCtx.fillRect(0, 0, this._canvasWidth, this._canvasHeight)

    var barWidth = (this._canvasWidth / analyzer._bufferLength) * 2.5
    var barHeight
    var x = 0

    for (var i = 0; i < analyzer._bufferLength; i++) {
      barHeight = analyzer._dataArray[i]

      this._canvasCtx.fillStyle = 'rgb(' + (barHeight + 100) + ',50,50)'
      this._canvasCtx.fillRect(
        x,
        this._canvasHeight - barHeight / 2,
        barWidth,
        barHeight / 2
      )

      x += barWidth + 1
    }
  }
}
