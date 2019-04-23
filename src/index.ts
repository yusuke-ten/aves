import AvesDrawer from './canvas'
import Aves from './aves'

export default class {
  private _canvas: AvesDrawer
  public aves: Aves
  constructor() {
    this.aves = new Aves()
    this._canvas = new AvesDrawer()
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
    this._canvas.animationStart(this.aves)
  }
  stop() {
    this.aves.stop()
    this._canvas.animationStop()
  }
  analyser() {
    this.aves.createanAlyser()
  }
}
