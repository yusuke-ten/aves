import Aves from './core/aves'
import AvesAnalyser from './core/analyser'
import AnalyserDrawer from './drawer/analyser'

export default class {

  // Class member
  public aves: Aves

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
    // this.avesDrawer.animationStart(this.aves)
  }
  stop() {
    this.aves.stop()
    // this.avesDrawer.animationStop()
  }
  createAnalyser(elm: HTMLCanvasElement, canvasWidth: number, canvasHeihgt: number) {
    const avesAnalyser = new AvesAnalyser()
    const analyserDrawer = new AnalyserDrawer(elm, canvasWidth, canvasHeihgt)
  }
}
