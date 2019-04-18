import audio from './audio'
export default class {
  private _canvasWidth: number = 1000
  private _canvasHeight: number = 400
  private _canvasElm: HTMLCanvasElement
  private _canvasCtx: CanvasRenderingContext2D
  private _animationFrameId: number

  constructor() {
    this._canvasElm = document.querySelector('#canvas')
    this._canvasElm.width = this._canvasWidth
    this._canvasElm.height = this._canvasHeight
    this._canvasCtx = this._canvasElm.getContext('2d')
    this._canvasCtx.fillStyle = 'rgb(0, 0, 0)'
    this._canvasCtx.clearRect(0, 0, this._canvasWidth, this._canvasHeight)
    this._canvasCtx.fillRect(0, 0, this._canvasWidth, this._canvasHeight)
    this._canvasCtx.strokeStyle = 'white'
    this._canvasCtx.strokeText('青色でstrokText', 10, 25)
  }
  drawAnalyser(spectrum: audio) {
    const barWidth: number = (this._canvasWidth / spectrum._bufferLength) * 2.5

    let x: number = 0

    for (let i: number = 0; i < spectrum._bufferLength; i++) {
      let barHeight: number = spectrum._dataArray[i]

      this._canvasCtx.fillStyle = `rgb(${barHeight + 100},50,50)`

      this._canvasCtx.fillRect(
        x,
        this._canvasHeight - barHeight / 2,
        barWidth,
        barHeight / 2
      )

      x += barWidth + 1
    }
  }
  animationStart(spectrum: audio) {
    this._animationFrameId = requestAnimationFrame(() =>
      this.animationStart(spectrum)
    )
    this._canvasCtx.fillStyle = 'rgb(0, 0, 0)'
    this._canvasCtx.fillRect(0, 0, this._canvasWidth, this._canvasHeight)
    spectrum.setFrequency()
    this.drawAnalyser(spectrum)
  }
  animationStop() {
    cancelAnimationFrame(this._animationFrameId)
  }
}
