import Aves from './Aves'
export default class {
  private _analyserNode: AnalyserNode
  private _freqPerIndex: number
  private _bufferLength: number
  public maxHz: number = 16000
  public unit8Array: Uint8Array
  public float32Array: Float32Array
  public timeDomainArray: Uint8Array
  public maxHzIndex: number
  // private
  constructor(aves: Aves) {
    this._analyserNode = aves.audioCtx.createAnalyser()
    aves.source.connect(this._analyserNode)

    // default 2048
    this._analyserNode.fftSize = 2048

    // Array[0] is the strength of frequencies from 0 to 23.4Hz.
    // Array[1] is the strength of frequencies from 23.4Hz to 46.8Hz.
    // Array[2] is the strength of frequencies from 46.8Hz to 70.2Hz.
    // Array[3] is the strength of frequencies from 70.2Hz to 93.6Hz. ...
    this._freqPerIndex = aves.sampleRate / this._analyserNode.fftSize

    this.maxHz = 16000
    this.maxHzIndex = Math.floor(this.maxHz / this._freqPerIndex)

    // fftSize / 2
    this._bufferLength = this._analyserNode.frequencyBinCount
    this.unit8Array = new Uint8Array(this._bufferLength)
    this.float32Array = new Float32Array(this._bufferLength)
  }

  indexAtSpecificHz(hz: number): number {
    return Math.floor(hz / this._freqPerIndex)
  }
  hzAtSpecificIndex(index: number): number {
    return index * this._freqPerIndex
  }

  getByteFrequencyData() {
    this._analyserNode.getByteFrequencyData(this.unit8Array)
  }
  getFloatFrequencyData() {
    this._analyserNode.getFloatFrequencyData(this.float32Array)
  }
  getByteTimeDomainData() {
    this._analyserNode.getByteTimeDomainData(this.timeDomainArray)
  }
}
