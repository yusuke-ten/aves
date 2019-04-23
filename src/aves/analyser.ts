import Aves from './aves'
export default class {
  public analyserNode: AnalyserNode
  public freqDivBufferLength: number
  public _n500Hz: number
  public _bufferLength: number
  public _unit8Array: Uint8Array
  public _float32Array: Float32Array
  public _timeDomainArray: Uint8Array
  public _maxHz: number
  public _maxHzIndex: number
  // private
  constructor(aves: Aves) {
    this.analyserNode = aves.audioCtx.createAnalyser()
    aves.source.connect(this.analyserNode)

    // default 2048
    this.analyserNode.fftSize = 2048

    // Array[0] is the strength of frequencies from 0 to 23.4Hz.
    // Array[1] is the strength of frequencies from 23.4Hz to 46.8Hz.
    // Array[2] is the strength of frequencies from 46.8Hz to 70.2Hz.
    // Array[3] is the strength of frequencies from 70.2Hz to 93.6Hz.
    // ...
    this.freqDivBufferLength = aves.sampleRate / this.analyserNode.fftSize
    console.log(aves.sampleRate)

    this._n500Hz = Math.floor(500 / this.freqDivBufferLength)
    this._maxHz = 16000
    this._maxHzIndex = Math.floor(this._maxHz / this.freqDivBufferLength)
    console.log(this._maxHzIndex)

    // fftSize / 2
    this._bufferLength = this.analyserNode.frequencyBinCount
    this._unit8Array = new Uint8Array(this._bufferLength)
    this._float32Array = new Float32Array(this._bufferLength)
  }

  freqDivIndex(index: number): number {
    return index * this.freqDivBufferLength
  }

  getByteFrequencyData() {
    this.analyserNode.getByteFrequencyData(this._unit8Array)
  }
  getFloatFrequencyData() {
    this.analyserNode.getFloatFrequencyData(this._float32Array)
  }
  getByteTimeDomainData() {
    this.analyserNode.getByteTimeDomainData(this._timeDomainArray)
  }

  // get dataArray() {
  //   return this.dataArray
  // }
  // get bufferLength() {
  //   return this.bufferLength
  // }
}
