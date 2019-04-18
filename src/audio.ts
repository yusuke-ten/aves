export default class {
  private _audioCtx: AudioContext
  public _source: AudioBufferSourceNode
  public _analyserNode: AnalyserNode
  public _bufferLength: number
  public _spectrum: Uint8Array
  public _timeDomainArray: Uint8Array
  // private
  constructor() {
    this._audioCtx = new AudioContext()
    this._source = this._audioCtx.createBufferSource()
    this._source.connect(this._audioCtx.destination)
  }
  decodeAudio(audioData: ArrayBuffer): Promise<AudioBufferSourceNode> {
    return this._audioCtx
      .decodeAudioData(audioData)
      .then((buffer: AudioBuffer) => {
        this._source.buffer = buffer
        return this._source
      })
  }
  createanAlyser() {
    this._analyserNode = this._audioCtx.createAnalyser()
    // default 2048
    this._analyserNode.fftSize = 2048

    this._source.connect(this._analyserNode)

    // fftSize / 2
    this._bufferLength = this._analyserNode.frequencyBinCount
    this._spectrum = new Uint8Array(this._bufferLength)
    this._timeDomainArray = new Uint8Array(this._bufferLength)
    this.getByteTimeDomainData()
    console.log(this._timeDomainArray)
  }
  start() {
    this._source.start(0)
  }
  stop() {
    this._source.stop()
  }
  setFrequency() {
    this._analyserNode.getByteFrequencyData(this._spectrum)
  }
  getByteTimeDomainData() {
    this._analyserNode.getByteTimeDomainData(this._timeDomainArray)
  }

  // get dataArray() {
  //   return this.dataArray
  // }
  // get bufferLength() {
  //   return this.bufferLength
  // }
}
