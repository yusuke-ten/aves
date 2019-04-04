export default class {
  constructor() {
    window.AudioContext = window.AudioContext || window.webkitAudioContext
    this.audioCtx = new AudioContext()
    this.source = this.audioCtx.createBufferSource()
    this.analyser = this.audioCtx.createAnalyser()
    this.analyser.minDecibels = -90
    this.analyser.maxDecibels = -10
    this.analyser.smoothingTimeConstant = 0.85
    this.analyser.fftSize = 256
  }
  decodeAudio(audioData) {
    return this.audioCtx.decodeAudioData(audioData).then(buffer => {
      this.source.buffer = buffer
    })
  }
  start() {
    console.log(this)
    this.source.connect(this.analyser)
    this.analyser.connect(this.audioCtx.destination)
    this.bufferLength = this.analyser.frequencyBinCount
    this.dataArray = new Uint8Array(this.bufferLength)
    this.source.start(0)
  }
  // get dataArray() {
  //   return this.dataArray
  // }
  // get bufferLength() {
  //   return this.bufferLength
  // }
}
