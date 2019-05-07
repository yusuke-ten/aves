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
    canvasHeight: number
  ) {
    this._canvasElm = elm

    this._canvasElm.width = this._canvasWidth = canvasWidth
    this._canvasElm.height = this._canvasHeight = canvasHeight

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
    // draw initialize
    this._ctx.beginPath()
    this._ctx.fillStyle = this._bgColor
    this._ctx.fillRect(0, 0, this._canvasWidth, this._canvasHeight)

    // ─────────────────────────────────────────────────────────────────
    // 描画範囲は avesAnalyser.minHz < hz <= avesAnalyser.maxHz の間となる
    // ─────────────────────────────────────────────────────────────────

    // 後からグリッドを表示するための一時的な配列
    const DispHzAndX: { text: string; pointX: number }[] = []

    for (let i = 0; i <= avesAnalyser.maxHzIndex; i++) {
      const pointX = this.pointX(
        avesAnalyser.hzAtSpecificIndex(i),
        avesAnalyser.minHz,
        avesAnalyser.maxHz
      )

      // ─────────────────────────────────────────────────────────────────F
      // プロットする点を得る処理
      // ─────────────────────────────────────────────────────────────────
      let pointY: number =
        -1 *
        ((avesAnalyser.floatFrequencyArray[i] - avesAnalyser.maxDecibels) /
          avesAnalyser.range()) *
        this._canvasHeight

      if (i === avesAnalyser.minHzIndex) {
        this._ctx.moveTo(0, pointY)
      } else {
        this._ctx.lineTo(pointX, pointY)
      }

      // ─────────────────────────────────────────────────────────────────
      // 後からX軸に目盛りを描画するので今はデータを保存だけ
      // ─────────────────────────────────────────────────────────────────
      for (const hz of this._dispHz) {
        if (avesAnalyser.indexAtSpecificHz(hz) === i) {
          DispHzAndX.push({
            text: hz < 1000 ? String(hz) + 'Hz' : String(hz / 1000) + 'kHz',
            pointX: pointX
          })
        }
      }
    }

    // ─────────────────────────────────────────────────────────────────
    // 点から線を作る
    // ─────────────────────────────────────────────────────────────────
    this._ctx.strokeStyle = this.createColor(250, 250, 250, 1)
    this._ctx.lineWidth = 2
    this._ctx.stroke()

    this._ctx.fillStyle = this.createColor(50, 50, 50, 0.8)
    this._ctx.lineTo(this._canvasWidth, this._canvasHeight)
    this._ctx.lineTo(0, this._canvasHeight)
    this._ctx.closePath()
    this._ctx.fill()

    // グリッドとテキストを表示するために色とか諸々変更
    const fontSize = 11
    this._ctx.font = this.createFont(String(fontSize) + 'px')
    const gridSize = 0.6
    const gridStyle = this.createColor(230, 230, 230, 0.5)
    const scaleStyle = this.createColor(250, 250, 250, 1)

    // ─────────────────────────────────────────────────────────────────
    // X軸に目盛りを描画
    // ─────────────────────────────────────────────────────────────────
    for (const value of DispHzAndX) {
      this._ctx.fillStyle = gridStyle
      this._ctx.fillRect(value.pointX, 0, gridSize, this._canvasHeight)
      this._ctx.fillStyle = scaleStyle
      this._ctx.fillText(
        value.text,
        value.pointX - 12,
        this._canvasHeight - fontSize
      )
    }

    // ─────────────────────────────────────────────────────────────────
    // Y軸に目盛りを描画
    // ─────────────────────────────────────────────────────────────────
    for (const decibel of this._dispDecibel) {
      if (decibel === 0) continue
      const range = avesAnalyser.range()
      const text = String(decibel) 
      const pointY = this._canvasHeight * -(decibel / range)

      this._ctx.fillStyle = gridStyle
      this._ctx.fillRect(0, pointY, this._canvasWidth, gridSize)
      this._ctx.fillStyle = scaleStyle
      this._ctx.fillText(text, 5, pointY + 12)
    }

  }

  /**
   *
   *
   * @param {AvesAnalyser} avesAnalyser
   * requestAnimationFrameで自分自身を呼ぶ
   */
  animationStart(avesAnalyser: AvesAnalyser) {
    avesAnalyser.getFloatFrequencyData()
    this.draw(avesAnalyser)

    this._animationFrameId = requestAnimationFrame(() =>
      this.animationStart(avesAnalyser)
    )
  }

  animationStop() {
    cancelAnimationFrame(this._animationFrameId)
  }
}
