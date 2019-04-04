
export default class {
  constructor() {
    window.AudioContext = window.AudioContext || window.webkitAudioContext
    this.audioCtx = new AudioContext()
    this.source = this.audioCtx.createBufferSource()
    this.analyser = this.audioCtx.createAnalyser()
    // デフォルトは2048
    this.analyser.fftSize = 2048
    this.source.connect(this.analyser)
    this.analyser.connect(this.audioCtx.destination)
    // this.analyser.fftSizeの半分の値
    this.bufferLength = this.analyser.frequencyBinCount
    
    this.dataArray = new Uint8Array(this.bufferLength)
  }
  decodeAudio(audioData) {
    return this.audioCtx.decodeAudioData(audioData).then(buffer => {
      this.source.buffer = buffer
    })
  }
  start() {
    this.source.start(0)
  }
  // get dataArray() {
  //   return this.dataArray
  // }
  // get bufferLength() {
  //   return this.bufferLength
  // }
}
