import AvesDrawer from './drawer/index'
import Aves from './core/aves'

export default class {
  public avesDrawer: AvesDrawer
  public aves: Aves
  constructor() {
    this.aves = new Aves()
    this.avesDrawer = new AvesDrawer()
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
    this.avesDrawer.animationStart(this.aves)
  }
  stop() {
    this.aves.stop()
    this.avesDrawer.animationStop()
  }
  analyser() {
    this.aves.createanAlyser()
  }
}
