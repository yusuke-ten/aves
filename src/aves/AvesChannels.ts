import Aves from './Aves'
export default class {
  public numberOfChannels: number
  public sampleRate: number
  public timeInterval: number
  public channelLs: Float32Array
  public channelRs: Float32Array
  // private
  constructor(aves: Aves) {
    this.sampleRate = aves.sampleRate
    this.timeInterval = 1 / aves.sampleRate
    this.channelLs = new Float32Array(aves.audioBuffer.length)
    this.channelRs = new Float32Array(aves.audioBuffer.length)
    this.numberOfChannels = aves.audioBuffer.numberOfChannels

    if (aves.audioBuffer.numberOfChannels > 1) {
      this.channelLs.set(aves.audioBuffer.getChannelData(0))
      this.channelRs.set(aves.audioBuffer.getChannelData(1))
    } else if (aves.audioBuffer.numberOfChannels > 0) {
      this.channelLs.set(aves.audioBuffer.getChannelData(0))
    } else {
      window.alert('The number of channels is invalid.')
      return
    }
  }

  // channnels配列の何番目の要素がmSecなのかを返す
  // サンプリングレイト44100の時、50msecは2205番目の要素
  // 2205番目周期で50msec,100msecは4410番目
  indexAtspecificMSec(mSec: number) {
    return Math.floor(mSec * Math.pow(10, -3) * this.sampleRate)
  }
}
