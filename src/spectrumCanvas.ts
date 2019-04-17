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
  draw(spectrum: audioSpectrum) {
    let drawVisual = requestAnimationFrame(() => this.draw(spectrum))

    spectrum.setFrequency()

    this._canvasCtx.fillStyle = 'rgb(0, 0, 0)'
    this._canvasCtx.fillRect(0, 0, this._canvasWidth, this._canvasHeight)

    const barWidth: number = (this._canvasWidth / spectrum._bufferLength) * 2.5

    let barHeight: number
    var x = 0
    let barHeightArray = []

    for (var i = 0; i < spectrum._bufferLength; i++) {
      barHeight = spectrum._dataArray[i]
      barHeightArray.push(barHeight)

      this._canvasCtx.fillStyle = 'rgb(0,50,50)'
      console.log({
        x: x,
        y: this._canvasHeight - barHeight / 2,
        z: barWidth,
        a: barHeight / 2
      })

      this._canvasCtx.fillRect(
        x,
        this._canvasHeight - barHeight / 2,
        barWidth,
        barHeight / 2
      )

      x += barWidth + 1
    }
    console.log(barHeightArray)
  }
}
