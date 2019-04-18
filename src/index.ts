import canvas from './canvas'
import audio from './audio'

export default class {
  private _canvas: canvas
  private _audio: audio
  constructor() {
    this._audio = new audio()
    this._canvas = new canvas()
  }

  async loadAudio(audioData: ArrayBuffer): Promise<AudioBufferSourceNode> {
    try {
      return await this._audio.decodeAudio(audioData)
    } catch (error) {
      console.log(error)
    }
  }
  start() {
    this._audio.start()
    this._canvas.animationStart(this._audio)
  }
  stop() {
    this._audio.stop()
    this._canvas.animationStop()
  }
  analyser() {
    this._audio.createanAlyser()
  }
}
