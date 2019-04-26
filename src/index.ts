import Aves from './aves/Aves'
import AvesAnalyser from './aves/AvesAnalyser'
import DrawAnalyser from './drawer/DrawAnalyser'

export default class {
  // Class member
  public aves: Aves
  public avesAnalyser: AvesAnalyser
  public drawAnalyser: DrawAnalyser

  constructor() {
    this.aves = new Aves()
  }

  async loadAudio(audioData: ArrayBuffer): Promise<AudioBufferSourceNode> {
    try {
      return await this.aves.decodeAudio(audioData)
    } catch (error) {
      console.log(error)
    }
  }

  start() {
    this.aves.start()
    this.drawAnalyser.animationStart(this.avesAnalyser)
  }

  stop() {
    this.aves.stop()
    this.drawAnalyser.animationStop()
  }

  createAnalyser(
    elm: HTMLCanvasElement,
    canvasWidth: number,
    canvasHeihgt: number
  ) {
    this.avesAnalyser = new AvesAnalyser(this.aves)
    this.drawAnalyser = new DrawAnalyser(elm, canvasWidth, canvasHeihgt)
  }
}
