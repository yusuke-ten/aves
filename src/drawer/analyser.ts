import AvesAnalyser from '../aves/analyser'
export default class {
  private _canvasWidth: number
  private _canvasHeight: number
  private _canvasElm: HTMLCanvasElement
  private _canvasCtx: CanvasRenderingContext2D
  private _animationFrameId: number
  private _bgColor: string = 'rgb(70, 70, 70)'

  constructor(
    elm: HTMLCanvasElement,
    canvasWidth: number,
    canvasHeihgt: number
  ) {
    this._canvasElm = elm
    this._canvasElm.width = canvasWidth
    this._canvasElm.height = canvasHeihgt

    this._canvasCtx = this._canvasElm.getContext('2d')

    this._canvasCtx.fillStyle = this._bgColor
    this._canvasCtx.clearRect(0, 0, this._canvasWidth, this._canvasHeight)
    this._canvasCtx.fillRect(0, 0, this._canvasWidth, this._canvasHeight)
    this._canvasCtx.strokeStyle = 'white'
    this._canvasCtx.strokeText('青色でstrokText', 10, 25)
  }

  drawAnalyser(avesAnalyser: AvesAnalyser) {
    const barWidth: number = this._canvasWidth / avesAnalyser._maxHzIndex
    // const hz = avesAnalyser._sampleRate / avesAnalyser._analyserNode.fftSize

    let x: number = 0
    const barHeightArray = []

    for (let i: number = 0; i < avesAnalyser._bufferLength; i++) {
      if (i > avesAnalyser._maxHzIndex) break
      // let barHeight: number = avesAnalyser._avesAnalyser[i]
      let barHeight: number =
        (avesAnalyser._unit8Array[i] / 255) * this._canvasHeight

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

  animationStart(avesAnalyser: AvesAnalyser) {
    this._animationFrameId = requestAnimationFrame(() =>
      this.animationStart(avesAnalyser)
    )
    this._canvasCtx.fillStyle = this._bgColor
    this._canvasCtx.fillRect(0, 0, this._canvasWidth, this._canvasHeight)
    avesAnalyser.getByteFrequencyData()
    const barWidth: number = this._canvasWidth / avesAnalyser._bufferLength

    let x: number = 0
    for (let i: number = 0; i < avesAnalyser._bufferLength; i++) {
      var f = Math.floor(i * avesAnalyser.freqDivBufferLength) // index -> frequency

      // 500 Hz ?
      if (i % avesAnalyser._n500Hz === 0) {
        if (i > avesAnalyser._maxHzIndex) break
        var f = Math.floor(500 * (i / avesAnalyser._n500Hz)) // index -> frequency

        var text = f < 1000 ? f + ' Hz' : f / 1000 + ' kHz'
        // Draw grid (X)
        this._canvasCtx.fillStyle = `rgb(50,255,50)`
        this._canvasCtx.fillRect(x, 0, 1, this._canvasHeight)
        // Draw text (X)
        this._canvasCtx.fillText(text, x, this._canvasHeight)
      }
      x += this._canvasWidth / avesAnalyser._maxHzIndex
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
    this.drawAnalyser(avesAnalyser)
  }

  animationStop() {
    cancelAnimationFrame(this._animationFrameId)
  }
}
