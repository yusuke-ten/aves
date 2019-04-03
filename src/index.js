import * as dat from 'dat.gui'
import fft from './fft'
import audioProcesser from './audioProcesser'

function init() {
  // オーディオコンテクストを取得（ベンダープレフィックス含む）
  const elm = document.querySelector('#start')
  elm.addEventListener('click', function() {
    var request = new XMLHttpRequest()
    const url = 'sample.mp3'
    request.open('GET', url, true)
    request.responseType = 'arraybuffer'

    // Decode asynchronously
    request.onload = function() {
      var audioData = request.response
      const audio = new audioProcesser(audioData)
    }
    request.send()
  })
}

window.onload = init
