import Aves from './Aves'
export default class {
  public analyserNode: AnalyserNode
  private _freqDivBufferLength: number
  public bufferLength: number
  public unit8Array: Uint8Array
  public float32Array: Float32Array
  public timeDomainArray: Uint8Array
  public _maxHz: number = 16000
  public maxHzIndex: number
  // private
  constructor(aves: Aves) {
    this.analyserNode = aves.audioCtx.createAnalyser()
    aves.source.connect(this.analyserNode)

    // default 2048
    this.analyserNode.fftSize = 2048

    // Array[0] is the strength of frequencies from 0 to 23.4Hz.
    // Array[1] is the strength of frequencies from 23.4Hz to 46.8Hz.
    // Array[2] is the strength of frequencies from 46.8Hz to 70.2Hz.
    // Array[3] is the strength of frequencies from 70.2Hz to 93.6Hz. ...
    this._freqDivBufferLength = aves.sampleRate / this.analyserNode.fftSize

    this._maxHz = 16000
    this.maxHzIndex = Math.floor(this._maxHz / this._freqDivBufferLength)

    // fftSize / 2
    this.bufferLength = this.analyserNode.frequencyBinCount
    this.unit8Array = new Uint8Array(this.bufferLength)
    this.float32Array = new Float32Array(this.bufferLength)
  }

  indexAtSpecificHz(hz: number): number {
    return Math.floor(hz / this._freqDivBufferLength)
  }

  getByteFrequencyData() {
    this.analyserNode.getByteFrequencyData(this.unit8Array)
  }
  getFloatFrequencyData() {
    this.analyserNode.getFloatFrequencyData(this.float32Array)
  }
  getByteTimeDomainData() {
    this.analyserNode.getByteTimeDomainData(this.timeDomainArray)
  }
}
