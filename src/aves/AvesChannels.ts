import Aves from './Aves'
export default class {
  public numberOfChannels: number
  public channelLs: Float32Array
  public channelRs: Float32Array
  // private
  constructor(aves: Aves) {
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
}
