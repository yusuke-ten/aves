function init() {
  // オーディオコンテクストを取得（ベンダープレフィックス含む）
  window.AudioContext = window.AudioContext || window.webkitAudioContext
  var context = new AudioContext()

  const elm = document.querySelector('#start')
  elm.addEventListener('click', function() {
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
