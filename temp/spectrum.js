export default class {
  constructor(audioData) {
    this.canvas = document.querySelector('#canvas')
    this.canvas.width = 500
    this.canvas.height = 500
    this.canvasCtx = this.canvas.getContext('2d')
    this.canvasCtx.clearRect(0, 0, 500, 500)
  }
  draw() {
    let WIDTH = 500
    let HEIGHT = 500
    let drawVisual = requestAnimationFrame(() => this.draw())

    
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