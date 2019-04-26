import AvesChannels from '../aves/AvesChannels'
export default class {
  private _canvasWidth: number
  private _canvasHeight: number
  private _canvasElm: HTMLCanvasElement
  private _ctx: CanvasRenderingContext2D
  private _bgColor: string
  private gridStyle: string = this.createColor(230, 230, 230, 0.5)
  private scaleStyle: string = this.createColor(250, 250, 250, 1)

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

  draw(avesChannels: AvesChannels) {
    console.log(avesChannels.channelLs)
    this._ctx.beginPath()
    for (var i = 0, len = avesChannels.channelLs.length; i < len; i++) {
      var x = (i / len) * this._canvasWidth
      var y = ((1 - avesChannels.channelLs[i]) / 2) * this._canvasHeight
      if (i === 0) {
        this._ctx.moveTo(x, y)
      } else {
        this._ctx.lineTo(x, y)
      }
    }
    this._ctx.stroke()
  }
}
