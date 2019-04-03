export default class {
  constructor(audioData) {
    window.AudioContext = window.AudioContext || window.webkitAudioContext
    this.audioCtx = new AudioContext()
    this.source = this.audioCtx.createBufferSource()
    this.analyser = this.audioCtx.createAnalyser()

    this.audioCtx.decodeAudioData(audioData).then(buffer => {
      // デコードしたデータをここで使う
      console.log(buffer)
      this.source.buffer = buffer

      this.source.connect(this.audioCtx.destination)
      this.source.start(0)
    })
  }
}
