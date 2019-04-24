import AvesAnalyser from '../aves/AvesAnalyser'
export default class {
  private _canvasWidth: number
  private _canvasHeight: number
  private _canvasElm: HTMLCanvasElement
  private _canvasCtx: CanvasRenderingContext2D
  private _animationFrameId: number
  private _bgColor: string = 'rgb(70, 70, 70)'
  private _dispHz: number[] = [
    20,
    50,
    100,
    200,
    500,
    1000,
    2000,
    5000,
    10000,
    15000
  ]

  constructor(
    elm: HTMLCanvasElement,
    canvasHeihgt: number,
    canvasWidth: number
  ) {
    this._canvasElm = elm

    this._canvasElm.width = this._canvasWidth = canvasWidth
    this._canvasElm.height = this._canvasHeight = canvasHeihgt

    this._canvasCtx = this._canvasElm.getContext('2d')

    this._canvasCtx.clearRect(0, 0, this._canvasWidth, this._canvasHeight)
    this._canvasCtx.fillStyle = this._bgColor
    this._canvasCtx.fillRect(0, 0, this._canvasWidth, this._canvasHeight)
  }

  drawFrame(avesAnalyser: AvesAnalyser) {
    this._canvasCtx.fillStyle = this._bgColor
    this._canvasCtx.fillRect(0, 0, this._canvasWidth, this._canvasHeight)

    const textYs = ['1.00', '0.50', '0.00']
    for (let i = 0, len = textYs.length; i < len; i++) {
      const text = textYs[i]
      const gy = (1 - parseFloat(text)) * this._canvasHeight
      // Draw grid (Y)
      this._canvasCtx.fillRect(0, gy, this._canvasWidth, 1)
      // Draw text (Y)
      this._canvasCtx.fillText(text, 0, gy)
    }

    let x: number = 0
    for (let i: number = 0; i < avesAnalyser.maxHzIndex; i++) {
      for (const hz of this._dispHz) {
        if (avesAnalyser.indexAtSpecificHz(hz) === i) {

          // console.log(this._canvasWidth / (Math.LOG10E * Math.log(avesAnalyser.maxHzIndex)))

          const text: string = hz < 1000 ? String(hz) : String(hz / 1000)
          // Draw grid (X)
          this._canvasCtx.fillStyle = `rgb(50,255,50)`
          this._canvasCtx.fillRect(
            (this._canvasWidth / (Math.LOG10E * Math.log(avesAnalyser.maxHz))) *
              (Math.LOG10E * Math.log(hz)),
            0,
            1,
            this._canvasHeight
          )
          // Draw text (X)
          this._canvasCtx.fillText(
            text,
            (this._canvasWidth / (Math.LOG10E * Math.log(avesAnalyser.maxHz))) *
              (Math.LOG10E * Math.log(hz)),
            this._canvasHeight
          )
        }
      }
      x +=
        this._canvasWidth /
        (Math.LOG10E * Math.log(avesAnalyser.hzAtSpecificIndex(i)))
    }
  }

  drawAnalyser(avesAnalyser: AvesAnalyser) {
    const barWidth: number = this._canvasWidth / avesAnalyser.maxHzIndex

    let x: number = 0
    const barHeightArray = []

    for (let i: number = 0; i < avesAnalyser.maxHzIndex; i++) {
      // let barHeight: number = avesAnalyser._avesAnalyser[i]
      let barHeight: number =
        (avesAnalyser.unit8Array[i] / 255) * this._canvasHeight

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
    avesAnalyser.getByteFrequencyData()
    this.drawFrame(avesAnalyser)
    this.drawAnalyser(avesAnalyser)

    this._animationFrameId = requestAnimationFrame(() =>
      this.animationStart(avesAnalyser)
    )
  }

  animationStop() {
    cancelAnimationFrame(this._animationFrameId)
  }
}
