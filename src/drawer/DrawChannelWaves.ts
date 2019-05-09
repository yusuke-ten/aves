import AvesChannels from '../aves/AvesChannels'
import * as util from '../util'
export default class {
  private _canvasWidth: number
  private _canvasHeight: number
  private _canvasElm: HTMLCanvasElement
  private _ctx: CanvasRenderingContext2D
  private _bgColor: string
  private gridStyle: string = util.createColor(230, 230, 230, 0.5)
  private scaleStyle: string = util.createColor(250, 250, 250, 1)

  constructor(elm: HTMLCanvasElement, canvasWidth: number, canvasHeight: number) {
    this._canvasElm = elm

    this._canvasElm.width = this._canvasWidth = canvasWidth
    this._canvasElm.height = this._canvasHeight = canvasHeight

    this._ctx = this._canvasElm.getContext('2d')

    this._bgColor = util.createColor(46, 40, 48)

    this._ctx.clearRect(0, 0, this._canvasWidth, this._canvasHeight)
    this._ctx.fillStyle = this._bgColor
    this._ctx.fillRect(0, 0, this._canvasWidth, this._canvasHeight)
  }

  draw(avesChannels: AvesChannels) {
    const startTime = performance.now()
    this._ctx.beginPath()
    const length = avesChannels.channelLs.length
    const n50msec = avesChannels.indexAtSpecificMSec(50)

    for (var i = 0; i < length / 10000; i++) {
      var x = ((i * 10000) / length) * this._canvasWidth
      const channle = avesChannels.channelLs[i * 10000]
      var y = ((1 - avesChannels.channelLs[i * 10000]) / 2) * this._canvasHeight

      if (i === 0) {
        this._ctx.moveTo(x, y)
      } else {
        this._ctx.lineTo(x, y)
      }
    }
    this._ctx.stroke()
    const endTime = performance.now()
    console.log(endTime - startTime)
  }
}
