export default class {
  private _audioCtx: AudioContext
  public _sampleRate: number
  public _source: AudioBufferSourceNode
  public _analyserNode: AnalyserNode
  public _freqDivBufferLength: number
  public _n500Hz: number
  public _bufferLength: number
  public _unit8Array: Uint8Array
  public _float32Array: Float32Array
  public _timeDomainArray: Uint8Array
  // private
  constructor() {
    this._audioCtx = new AudioContext()
    this._sampleRate = this._audioCtx.sampleRate
    console.log(this._sampleRate)

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

    // Array[0] is the strength of frequencies from 0 to 23.4Hz.
    // Array[1] is the strength of frequencies from 23.4Hz to 46.8Hz.
    // Array[2] is the strength of frequencies from 46.8Hz to 70.2Hz.
    // Array[3] is the strength of frequencies from 70.2Hz to 93.6Hz.
    // ...
    this._freqDivBufferLength = this._sampleRate / this._analyserNode.fftSize

    this._n500Hz = Math.floor(500 / this._freqDivBufferLength)

    this._source.connect(this._analyserNode)

    // fftSize / 2
    this._bufferLength = this._analyserNode.frequencyBinCount
    this._unit8Array = new Uint8Array(this._bufferLength)
    this._float32Array = new Float32Array(this._bufferLength)
  }
  freqDivIndex(index: number): number {
    return index * this._freqDivBufferLength 
  }
  start() {
    this._source.start(0)
  }
  stop() {
    this._source.stop()
  }
  getByteFrequencyData() {
    this._analyserNode.getByteFrequencyData(this._unit8Array)
  }
  getFloatFrequencyData() {
    this._analyserNode.getFloatFrequencyData(this._float32Array)
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
