export default class {
  public audioCtx: AudioContext
  public sampleRate: number
  public audioBuffer: AudioBuffer
  public source: AudioBufferSourceNode
  // private
  constructor() {
    if (!window) {
      throw new Error('Window object not found!!')
    }
    this.audioCtx = new AudioContext()
    this.sampleRate = this.audioCtx.sampleRate
    this.source = this.audioCtx.createBufferSource()
    this.source.connect(this.audioCtx.destination)
  }

  decodeAudio(audioData: ArrayBuffer): Promise<AudioBufferSourceNode> {
    return this.audioCtx.decodeAudioData(audioData).then((buffer: AudioBuffer) => {
      this.audioBuffer = buffer
      this.source.buffer = buffer
      return this.source
    })
  }

  start() {
    this.source.start(0)
  }
  stop() {
    this.source.stop()
  }
}
