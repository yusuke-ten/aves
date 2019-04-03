export default class {
  constructor(audioData) {
    window.AudioContext = window.AudioContext || window.webkitAudioContext
    this.audioCtx = new AudioContext()
    this.source = this.audioCtx.createBufferSource()
    this.analyser = this.audioCtx.createAnalyser()
    this.analyser.minDecibels = -90
    this.analyser.maxDecibels = -10
    this.analyser.smoothingTimeConstant = 0.85
    this.analyser.fftSize = 256
    this.canvas = document.querySelector('#canvas')
    this.canvas.width = 500
    this.canvas.height = 500
    this.canvasCtx = this.canvas.getContext('2d')
    this.decodeAudio(audioData)
  }
  decodeAudio(audioData) {
    this.audioCtx.decodeAudioData(audioData, buffer => {
      console.log(this)
      console.log(this.source)
      this.source.buffer = buffer
      this.source.connect(this.analyser)
      this.analyser.connect(this.audioCtx.destination)
      this.bufferLength = this.analyser.frequencyBinCount
      this.dataArray = new Uint8Array(this.bufferLength)
      this.canvasCtx.clearRect(0, 0, 500, 500)
      this.draw()
      this.source.start(0)
    })
  }
  temp() {}
  draw() {
    let WIDTH = 500
    let HEIGHT = 500
    console.log(this)
    let drawVisual = requestAnimationFrame(this.draw)

    this.analyser.getByteFrequencyData(this.dataArray)

    this.canvasCtx.fillStyle = 'rgb(0, 0, 0)'
    this.canvasCtx.fillRect(0, 0, WIDTH, HEIGHT)

    var barWidth = (WIDTH / this.bufferLength) * 2.5
    var barHeight
    var x = 0

    for (var i = 0; i < this.bufferLength; i++) {
      barHeight = this.dataArray[i]

      this.canvasCtx.fillStyle = 'rgb(' + (barHeight + 100) + ',50,50)'
      this.canvasCtx.fillRect(
        x,
        HEIGHT - barHeight / 2,
        barWidth,
        barHeight / 2
      )

      x += barWidth + 1
    }
  }
}
