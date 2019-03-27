// Gilián Zoltán <gilian@caesar.elte.hu>, 2014
// Simplified BSD Licens

export default class {
  constructor(BLOCK_SIZE, BLOCK_COUNT) {
    this.BLOCK_SIZE = BLOCK_SIZE
    this.BLOCK_COUNT = BLOCK_COUNT
    this.HEAD = 0
    this.SIZE = 0
    this.BUFFER_SIZE = BLOCK_SIZE * BLOCK_COUNT
    this.BUFFER = new Float32Array(this.BUFFER_SIZE)
  }

  pushBuffer(blockData) {
    if (blockData.length !== this.BLOCK_SIZE) {
      throw new Error(
        'the length of "block_data" should be ' + this.BLOCK_SIZE.toString()
      )
    }
    for (let i = 0; i < this.BLOCK_SIZE; ++i) {
      this.BUFFER[this.HEAD + i] = blockData[i]
    }
    if (this.IsFilled()) {
      this.HEAD += this.BLOCK_SIZE
      if (this.HEAD === this.BUFFER_SIZE) {
        this.HEAD = 0
      }
    } else {
      this.SIZE += this.BLOCK_SIZE
    }
  }

  getBuffer(i) {
    return this.BUFFER[(this.HEAD + i) % this.BUFFER_SIZE]
  }

  CopyBuffer(dest) {
    for (let i = 0; i < this.SIZE; i++) {
      dest[i] = this.getBuffer(i)
    }
  }

  IsFilled() {
    return this.SIZE === this.BUFFER_SIZE
  }
}
