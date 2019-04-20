import audio from './audio'
export default class {
  private _canvasWidth: number = 3000
  private _canvasHeight: number = 500
  private _canvasElm: HTMLCanvasElement
  private _canvasCtx: CanvasRenderingContext2D
  private _animationFrameId: number
  private _bgColor: string = 'rgb(70, 70, 70)'

  constructor() {
    this._canvasElm = document.querySelector('#canvas')
    this._canvasElm.width = this._canvasWidth
    this._canvasElm.height = this._canvasHeight
    this._canvasCtx = this._canvasElm.getContext('2d')
    this._canvasCtx.fillStyle = this._bgColor
    this._canvasCtx.clearRect(0, 0, this._canvasWidth, this._canvasHeight)
    this._canvasCtx.fillRect(0, 0, this._canvasWidth, this._canvasHeight)
    this._canvasCtx.strokeStyle = 'white'
    this._canvasCtx.strokeText('青色でstrokText', 10, 25)
  }
  drawAnalyser(spectrum: audio) {
    const barWidth: number = this._canvasWidth / spectrum._bufferLength
    // const hz = spectrum._sampleRate / spectrum._analyserNode.fftSize
    

    let x: number = 0
    const barHeightArray = []

    for (let i: number = 0; i < spectrum._bufferLength; i++) {

      // let barHeight: number = spectrum._spectrum[i]
      let barHeight: number = (spectrum._unit8Array[i] / 255) * this._canvasHeight

      barHeightArray.push(barHeight)

      this._canvasCtx.fillStyle = `rgb(${barHeight + 100},50,50)`

      this._canvasCtx.fillRect(
        x,
        this._canvasHeight - barHeight,
        barWidth,
        barHeight
      )

      x += barWidth
    }
  }
  animationStart(spectrum: audio) {
    this._animationFrameId = requestAnimationFrame(() =>
      this.animationStart(spectrum)
    )
    this._canvasCtx.fillStyle = this._bgColor
    this._canvasCtx.fillRect(0, 0, this._canvasWidth, this._canvasHeight)
    spectrum.getByteFrequencyData()
    const barWidth: number = this._canvasWidth / spectrum._bufferLength

    let x: number = 0
    for (let i: number = 0; i < spectrum._bufferLength; i++) {
      var f = Math.floor(i * spectrum._fsDivN) // index -> frequency

      // 500 Hz ?
      if (i % spectrum._n500Hz === 0) {
        var f = Math.floor(500 * (i / spectrum._n500Hz)) // index -> frequency

        var text = f < 1000 ? f + ' Hz' : f / 1000 + ' kHz'
        // Draw grid (X)
        this._canvasCtx.fillStyle = `rgb(50,255,50)`
        this._canvasCtx.fillRect(x, 0, 1, this._canvasHeight)
        // Draw text (X)
        this._canvasCtx.fillText(text, x, this._canvasHeight)
      }
      x += this._canvasWidth / spectrum._bufferLength
    }
    var textYs = ['1.00', '0.50', '0.00']
    for (var i = 0, len = textYs.length; i < len; i++) {
      var text = textYs[i]
      var gy = (1 - parseFloat(text)) * this._canvasHeight
      // Draw grid (Y)
      this._canvasCtx.fillRect(0, gy, this._canvasWidth, 1)
      // Draw text (Y)
      this._canvasCtx.fillText(text, 0, gy)
    }
    this.drawAnalyser(spectrum)
  }
  animationStop() {
    cancelAnimationFrame(this._animationFrameId)
  }
}
