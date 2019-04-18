export default class {
  private _audioCtx: AudioContext
  public _source: AudioBufferSourceNode
  public _analyser: AnalyserNode
  public _bufferLength: number
  public _dataArray: Uint8Array
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
    this._analyser = this._audioCtx.createAnalyser()
    // default 2048
    this._analyser.fftSize = 2048
    this._source.connect(this._analyser)

    // fftSize / 2
    this._bufferLength = this._analyser.frequencyBinCount
    this._dataArray = new Uint8Array(this._bufferLength)
    console.log(this._dataArray)
  }
  start() {
    this._source.start(0)
  }
  stop() {
    this._source.stop()
  }
  setFrequency() {
    this._analyser.getByteFrequencyData(this._dataArray)
  }
  // get dataArray() {
  //   return this.dataArray
  // }
  // get bufferLength() {
  //   return this.bufferLength
  // }
}
