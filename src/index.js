import * as dat from 'dat.gui'
import fft from './fft'
import audioProcesser from './audioProcesser'
// import audioProcesser from './audioProcesser'

// function draw() {
//   let WIDTH = 500
//   let HEIGHT = 500

//   let drawVisual = requestAnimationFrame(() => this.draw())

//   this.analyser.getByteFrequencyData(this.dataArray)

//   this.canvasCtx.fillStyle = 'rgb(0, 0, 0)'
//   this.canvasCtx.fillRect(0, 0, WIDTH, HEIGHT)

//   var barWidth = (WIDTH / this.bufferLength) * 2.5
//   var barHeight
//   var x = 0

//   for (var i = 0; i < this.bufferLength; i++) {
//     barHeight = this.dataArray[i]

//     this.canvasCtx.fillStyle = 'rgb(' + (barHeight + 100) + ',50,50)'
//     this.canvasCtx.fillRect(x, HEIGHT - barHeight / 2, barWidth, barHeight / 2)

//     x += barWidth + 1
//   }
// }

function init() {
  const canvas = document.querySelector('#canvas')
  canvas.width = 500
  canvas.height = 500
  const canvasCtx = canvas.getContext('2d')
  canvasCtx.clearRect(0, 0, 500, 500)
  const elm = document.querySelector('#start')
  elm.addEventListener('click', function() {
    var request = new XMLHttpRequest()
    const url = 'sample.mp3'
    request.open('GET', url, true)
    request.responseType = 'arraybuffer'

    // Decode asynchronously
    request.onload = function() {
      var audioData = request.response
      const audio = new audioProcesser()
      audio.decodeAudio(audioData).then(function() {
        console.log('temp')
        audio.start()
      })
    }
    request.send()
  })
}

window.onload = init
