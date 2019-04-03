import * as dat from 'dat.gui'
import fft from './fft'

var controller = {
  ref_level: 1e-4,
  db_min: -70,
  db_range: 70,
  freq_min_cents: 4 * 1200, // relative to C0
  freq_range_cents: 3 * 1200, // 3 octaves
  block_size: 1024,
  blocks_per_fft: 8
}

navigator.getUserMedia =
  navigator.getUserMedia ||
  navigator.webkitGetUserMedia ||
  navigator.mozGetUserMedia

function UpdateController() {
  if (processor) {
    source.disconnect()
    processor.disconnect()
  }

  controller.block_size = parseInt(controller.block_size)
  controller.blocks_per_fft = parseInt(controller.blocks_per_fft)

  sample_buffer = new Float32CyclicBuffer(
    controller.block_size,
    controller.blocks_per_fft
  )
  fft = new FFTAlgorithm(controller.block_size * controller.blocks_per_fft)

  processor = audio_context.createScriptProcessor(controller.block_size, 1, 1)
  processor.onaudioprocess = function(evt) {
    sample_buffer.Push(evt.inputBuffer.getChannelData(0))
  }
  source.connect(processor)
  // ScriptProcessorNode needs a connected output to work
  processor.connect(audio_context.destination)
}

function init() {
  // オーディオコンテクストを取得（ベンダープレフィックス含む）
  window.AudioContext = window.AudioContext || window.webkitAudioContext
  var context = new AudioContext()

  const elm = document.querySelector('#start')
  elm.addEventListener('click', function() {
    navigator.getUserMedia(
      { audio: true },
      function(stream) {
        let source = context.createMediaStreamSource(stream)
        console.log(source)
        UpdateController()
        // Render()
      },
      function(e) {
        console.log('navigator.getUserMedia error: ', e)
        message.innerHTML = 'navigator.getUserMedia error: ' + e.name
      }
    )
    var request = new XMLHttpRequest()
    const url = 'sample.mp3'
    request.open('GET', url, true)
    request.responseType = 'arraybuffer'

    // Decode asynchronously
    request.onload = function() {
      context.decodeAudioData(
        request.response,
        function(buffer) {
          console.log(buffer)
        },
        function(error) {
          console.log(error)
        }
      )
    }
    request.send()
  })
}

window.onload = init
