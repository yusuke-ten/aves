export default class {
  private _audioCtx: AudioContext
  private _source: AudioBufferSourceNode
  public _analyser: AnalyserNode
  public _bufferLength: number
  public _dataArray: Uint8Array
  // private
  constructor() {
    this._audioCtx = new AudioContext()
    this._source = this._audioCtx.createBufferSource()
    this._analyser = this._audioCtx.createAnalyser()
    // デフォルトは2048
    this._analyser.fftSize = 2048
    this._source.connect(this._analyser)
    this._analyser.connect(this._audioCtx.destination)
    // this._analyser.fftSizeの半分の値
    this._bufferLength = this._analyser.frequencyBinCount

    this._dataArray = new Uint8Array(this._bufferLength)
  }
  decodeAudio(audioData: ArrayBuffer) {
    return this._audioCtx.decodeAudioData(audioData).then(buffer => {
      this._source.buffer = buffer
    })
  }
  start() {
    this._source.start(0)
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
