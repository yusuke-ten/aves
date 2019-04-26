import Aves from './aves/Aves'
import AvesAnalyser from './aves/AvesAnalyser'
import DrawSpectrumAnalyser from './drawer/DrawSpectrumAnalyser'
import DrawTimeDomainAnalyser from './drawer/DrawTimeDomainAnalyser'

export default class {
  // Class member
  public aves: Aves
  public avesAnalyser: AvesAnalyser
  public drawSpectrumAnalyser: DrawSpectrumAnalyser
  public drawTimeDomainAnalyser: DrawTimeDomainAnalyser

  constructor() {
    this.aves = new Aves()
  }


  /**
   *
   *
   * @param {ArrayBuffer} audioData
   * @returns {Promise<AudioBufferSourceNode>}
   */
  async loadAudio(audioData: ArrayBuffer): Promise<AudioBufferSourceNode> {
    try {
      return await this.aves.decodeAudio(audioData)
    } catch (error) {
      console.log(error)
    }
  }

  start(): void {
    this.aves.start()
    if (this.drawSpectrumAnalyser instanceof DrawSpectrumAnalyser) {
      this.drawSpectrumAnalyser.animationStart(this.avesAnalyser)
    }
    if (this.drawTimeDomainAnalyser instanceof DrawTimeDomainAnalyser) {
      this.drawTimeDomainAnalyser.animationStart(this.avesAnalyser)
    }
  }

  stop(): void {
    this.aves.stop()
    if (this.drawSpectrumAnalyser instanceof DrawSpectrumAnalyser) {
      this.drawSpectrumAnalyser.animationStop()
    }
    if (this.drawTimeDomainAnalyser instanceof DrawTimeDomainAnalyser) {
      this.drawTimeDomainAnalyser.animationStop()
    }
  }

  /**
   *
   *
   * @param {HTMLCanvasElement} elm
   * @param {number} canvasWidth
   * @param {number} canvasHeihgt
   */
  createSpectrumAnalyser(
    elm: HTMLCanvasElement,
    canvasWidth: number,
    canvasHeihgt: number
  ) {
    this.avesAnalyser = new AvesAnalyser(this.aves)
    this.drawSpectrumAnalyser = new DrawSpectrumAnalyser(
      elm,
      canvasWidth,
      canvasHeihgt
    )
  }

  /**
   *
   *
   * @param {HTMLCanvasElement} elm
   * @param {number} canvasWidth
   * @param {number} canvasHeihgt
   */
  createTimeDomainAnalyser(
    elm: HTMLCanvasElement,
    canvasWidth: number,
    canvasHeihgt: number
  ) {
    this.avesAnalyser = new AvesAnalyser(this.aves)
    this.drawTimeDomainAnalyser = new DrawTimeDomainAnalyser(
      elm,
      canvasWidth,
      canvasHeihgt
    )
  }
}
