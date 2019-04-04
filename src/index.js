
import AnalyzerNode from './analyzerNode'

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
      audioLoad(request.response)
    }
    request.send()
  })
  function draw(analyzer) {
    let WIDTH = 500
    let HEIGHT = 500

    let drawVisual = requestAnimationFrame(() => draw(analyzer))

    analyzer.analyser.getByteFrequencyData(analyzer.dataArray)

    canvasCtx.fillStyle = 'rgb(0, 0, 0)'
    canvasCtx.fillRect(0, 0, WIDTH, HEIGHT)

    var barWidth = (WIDTH / analyzer.bufferLength) * 2.5
    var barHeight
    var x = 0

    for (var i = 0; i < analyzer.bufferLength; i++) {
      barHeight = analyzer.dataArray[i]

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
  function audioLoad(audioData) {
    const analyzer = new AnalyzerNode()
    analyzer.decodeAudio(audioData).then(function() {
      console.log('temp')
      analyzer.start()
      draw(analyzer)
    })
  }
}

window.onload = init
