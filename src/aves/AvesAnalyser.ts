import Aves from './Aves'
export default class {
  private _analyserNode: AnalyserNode
  private _freqPerIndex: number
  private _bufferLength: number
  public sampleRate: number
  public byteFrequencyArray: Uint8Array
  public byteTimeDomainArray: Uint8Array
  public floatFrequencyArray: Float32Array
  public maxHz: number = 16000
  public minHz: number = 20
  // private
  constructor(aves: Aves) {
    this._analyserNode = aves.audioCtx.createAnalyser()
    aves.source.connect(this._analyserNode)

    // default 2048
    this._analyserNode.fftSize = 2048
    this.sampleRate = aves.sampleRate

    // Array[0] is the strength of frequencies from 0 to 23.4Hz.
    // Array[1] is the strength of frequencies from 23.4Hz to 46.8Hz.
    // Array[2] is the strength of frequencies from 46.8Hz to 70.2Hz.
    // Array[3] is the strength of frequencies from 70.2Hz to 93.6Hz. ...
    this._freqPerIndex = aves.sampleRate / this._analyserNode.fftSize

    // ─────────────────────────────────────────────────────────────────
    // 表示する最低、最高デジベルを設定
    // ─────────────────────────────────────────────────────────────────
    this.maxDecibels = 0
    this.minDecibels = -100

    // fftSize / 2　の数値が入る
    this._bufferLength = this._analyserNode.frequencyBinCount

    // ─────────────────────────────────────────────────────────────────
    // fftsizeが2048のときは、長さが1024の配列を作成
    // ─────────────────────────────────────────────────────────────────
    this.byteFrequencyArray = new Uint8Array(this._bufferLength)
    this.byteTimeDomainArray = new Uint8Array(this._analyserNode.fftSize)
    this.floatFrequencyArray = new Float32Array(this._bufferLength)
  }

  /**
   * 入力されたhzが音声データ配列の何番目の要素なのかを返す
   * @param {number} hz
   * @returns {number}
   */
  indexAtSpecificHz(hz: number): number {
    return Math.floor(hz / this._freqPerIndex)
  }

  /**
   * 入力された配列番号がが音声データの何Hzあたるのかを返す
   * @param {number} index
   * @returns {number}
   */
  hzAtSpecificIndex(index: number): number {
    return index * this._freqPerIndex
  }

  /**
   *
   * @returns
   */
  range(): number {
    return this._analyserNode.maxDecibels - this._analyserNode.minDecibels
  }

  /**
   * サンプルとサンプルの間の秒
   * @returns
   */
  samplingInterval(): number {
    return 1 / this.sampleRate
  }
  /**
   * 表示するHzの最大と最低に当たるインデックス番号を返す
   */
  get maxHzIndex(): number {
    return Math.floor(this.maxHz / this._freqPerIndex)
  }
  get minHzIndex(): number {
    return Math.floor(this.minHz / this._freqPerIndex)
  }

  /**
   * マックス、ミニマムデジベルのセッター、ゲッター
   * マックスデジベルとミニマムデジベルは
   * getFloatFrequencyData()でしか使えない
   */
  set maxDecibels(num: number) {
    this._analyserNode.maxDecibels = num
  }
  get maxDecibels(): number {
    return this._analyserNode.maxDecibels
  }
  set minDecibels(num: number) {
    this._analyserNode.minDecibels = num
  }
  get minDecibels(): number {
    return this._analyserNode.minDecibels
  }

  getByteFrequencyData() {
    this._analyserNode.getByteFrequencyData(this.byteFrequencyArray)
  }
  getFloatFrequencyData() {
    this._analyserNode.getFloatFrequencyData(this.floatFrequencyArray)
  }
  getByteTimeDomainData() {
    this._analyserNode.getByteTimeDomainData(this.byteTimeDomainArray)
  }
}
