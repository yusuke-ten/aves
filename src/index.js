import * as dat from 'dat.gui'
import fft from './fft'
// import audioProcesser from './audioProcesser'
window.AudioContext = window.AudioContext || window.webkitAudioContext
const audioCtx = new AudioContext()
const source = audioCtx.createBufferSource()
const analyser = audioCtx.createAnalyser()
analyser.minDecibels = -90
analyser.maxDecibels = -10
analyser.smoothingTimeConstant = 0.85
let dataArray
let canvasCtx
let bufferLength

function init() {
  var canvas = document.querySelector('#canvas')
  canvas.width = 500
  canvas.height = 500

  canvasCtx = canvas.getContext('2d')

  const elm = document.querySelector('#start')
  elm.addEventListener('click', function() {
    var request = new XMLHttpRequest()
    const url = 'sample.mp3'
    request.open('GET', url, true)
    request.responseType = 'arraybuffer'

    // Decode asynchronously
    request.onload = function() {
      var audioData = request.response
      audioCtx.decodeAudioData(audioData).then(buffer => {
        // デコードしたデータをここで使う
        source.buffer = buffer
        source.connect(analyser)
        analyser.connect(audioCtx.destination)
        analyser.fftSize = 256
        bufferLength = analyser.frequencyBinCount
        dataArray = new Uint8Array(bufferLength)

        canvasCtx.clearRect(0, 0, 500, 500)
        function draw() {
          let WIDTH = 500
          let HEIGHT = 500
          let drawVisual = requestAnimationFrame(draw)

          analyser.getByteFrequencyData(dataArray)

          canvasCtx.fillStyle = 'rgb(0, 0, 0)'
          canvasCtx.fillRect(0, 0, WIDTH, HEIGHT)

          var barWidth = (WIDTH / bufferLength) * 2.5
          var barHeight
          var x = 0

          for (var i = 0; i < bufferLength; i++) {
            barHeight = dataArray[i]

            canvasCtx.fillStyle = 'rgb(' + (barHeight + 100) + ',50,50)'
            canvasCtx.fillRect(
              x,
              HEIGHT - barHeight / 2,
              barWidth,
              barHeight / 2
            )

            x += barWidth + 1
          }
        }
        draw()
        source.start(0)
      })
    }
    request.send()
  })
}

window.onload = init
