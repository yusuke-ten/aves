export default class {
  constructor() {
    console.log('construct')
    window.AudioContext = window.AudioContext || window.webkitAudioContext
    const audioContext = new AudioContext()
    console.log(audioContext)
  }

  load() {
    console.log('load')
  }
}
