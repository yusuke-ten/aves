import AvesAnalyser from '../aves/AvesAnalyser'
export default class {
  private _canvasWidth: number
  private _canvasHeight: number
  private _canvasElm: HTMLCanvasElement
  private _ctx: CanvasRenderingContext2D
  private _animationFrameId: number
  private _bgColor: string
  private _dispHz: number[] = [
    30,
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
  private _dispDecibel: number[] = [
    0,
    -10,
    -20,
    -30,
    -40,
    -50,
    -60,
    -70,
    -80,
    -90
  ]

  constructor(
    elm: HTMLCanvasElement,
    canvasWidth: number,
    canvasHeihgt: number
  ) {
    this._canvasElm = elm

    this._canvasElm.width = this._canvasWidth = canvasWidth
    this._canvasElm.height = this._canvasHeight = canvasHeihgt

    this._ctx = this._canvasElm.getContext('2d')

    this._bgColor = this.createColor(46, 40, 48)

    this._ctx.clearRect(0, 0, this._canvasWidth, this._canvasHeight)
    this._ctx.fillStyle = this._bgColor
    this._ctx.fillRect(0, 0, this._canvasWidth, this._canvasHeight)
  }

  /**
   * @param {number} num
   * @returns 入力された数値の桁数を返す
   */
  seekDigit(num: number) {
    return Math.LOG10E * Math.log(num)
  }

  /**
   * @param {number} r Red
   * @param {number} g Green
   * @param {number} b Blue
   * @param {number} a Alpha
   * @returns {string} CSS rgba()
   */
  createColor(r: number, g: number, b: number, a: number = 1): string {
    return `rgba(${r}, ${g}, ${b}, ${a})`
  }

  /**
   *
   * フォント情報ストリングを作成する、後々ヘルパーとかに切り分けたほうがいい
   * @param {string} fontSize
   * @param {string} [type='']
   * @param {string} [font='sans-serif']
   * @returns {string}
   */
  createFont(
    fontSize: string,
    type: string = '',
    font: string = 'sans-serif'
  ): string {
    return `${type} ${fontSize} ${font}`
  }

  /**
   * 特定のHzをX軸のどの部分に対数表示をすればいいかを
   * 計算する。
   * @param {number} hz
   * @param {number} minHz
   * @param {number} maxHz
   * @returns {number} 横軸の画面位置
   */
  pointX(hz: number, minHz: number, maxHz: number): number {
    return (
      ((this.seekDigit(hz) - this.seekDigit(minHz)) /
        (this.seekDigit(maxHz) - this.seekDigit(minHz))) *
      this._canvasWidth
    )
  }

  /**
   * 描画メソッド
   * @param {AvesAnalyser} avesAnalyser
   */
  draw(avesAnalyser: AvesAnalyser) {
    const arrayLength = avesAnalyser.byteTimeDomainArray.length
    const gridStyle = this.createColor(230, 230, 230, 0.5)
    const period = 1 / avesAnalyser.sampleRate
    this._ctx.beginPath()
    this._ctx.fillStyle = this._bgColor
    this._ctx.fillRect(0, 0, this._canvasWidth, this._canvasHeight)
    // ─────────────────────────────────────────────────────────────────
    // avesAnalyser.byteTimeDomainArrayの中身の数値は0~255
    for (let i = 0; i <= arrayLength; i++) {
      const pointX = (i / arrayLength) * this._canvasWidth

      const pointY =
        (1 - avesAnalyser.byteTimeDomainArray[i] / 255) * this._canvasHeight

      if (i === 0) {
        this._ctx.moveTo(0, pointY)
      } else {
        this._ctx.lineTo(pointX, pointY)
      }

      var sec = i * period // index -> time
      var msec = sec * Math.pow(10, 3) // sec -> msec
      // 5 msec ?
      if (msec % 5 === 0) {
        this._ctx.fillStyle = gridStyle
        var text = Math.round(msec) + ' msec'
        // Draw grid (X)
        this._ctx.fillRect(pointX, 0, 1, this._canvasHeight)
        // Draw text (X)
        this._ctx.fillText(text, pointX, this._canvasHeight)
      }
    }
    this._ctx.strokeStyle = this.createColor(250, 250, 250, 1)
    this._ctx.lineWidth = 1
    this._ctx.stroke()

    var textYs = ['1.00', '0.00', '-1.00']
    for (var i = 0, len = textYs.length; i < len; i++) {
      var text = textYs[i]
      var gy = ((1 - parseFloat(text)) / 2) * this._canvasHeight
      // Draw grid (Y)
      this._ctx.fillRect(0, gy, this._canvasWidth, 1)
      // Draw text (Y)
      this._ctx.fillText(text, 0, gy)
    }
  }

  /**
   *
   *
   * @param {AvesAnalyser} avesAnalyser
   * requestAnimationFrameで自分自身を呼ぶ
   */
  animationStart(avesAnalyser: AvesAnalyser) {
    avesAnalyser.getByteTimeDomainData()
    this.draw(avesAnalyser)

    this._animationFrameId = requestAnimationFrame(() =>
      this.animationStart(avesAnalyser)
    )
  }

  animationStop() {
    cancelAnimationFrame(this._animationFrameId)
  }
}
