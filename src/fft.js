// Gilián Zoltán <gilian@caesar.elte.hu>, 2014
// Simplified BSD License

// Járai Antal: Bevezetés a matematikába című jegyzet alapján készült.
// Harmadik kiadás, ELTE Eötvös Kiadó, 2009, 332-334 p.,
// 9.2.44. FFT algoritmus.

// based on the discrete mathematics textbook 'Bevezetés a matematikába' by
// Antal Járai (hungarian).

const sin = Math.sin
const cos = Math.cos
const pi2 = Math.PI * 2
const log2 = Math.log(2)

export default class {
  constructor(NUM_BINS) {
    this.NUM_BITS = Math.ceil(Math.log(NUM_BINS) / log2)
    this.NUM_BINS = 1 << this.NUM_BITS
    this.BUFFER = new Float32Array(2 * this.NUM_BINS)
    this.CreateBitRevLUT()
    this.CreateRootOfUnityLUT()
  }

  ReverseBits(x, nbits) {
    let y = 0
    for (let j = 0; j < nbits; ++j) {
      y <<= 1
      y |= x & 1
      x >>= 1
    }
    return y
  }

  CreateBitRevLUT() {
    this.BIT_REV = new Int32Array(this.NUM_BINS)
    for (let i = 0; i < this.NUM_BINS; ++i) {
      this.BIT_REV[i] = this.ReverseBits(i, this.NUM_BITS)
    }
  }
  CreateRootOfUnityLUT() {
    const n = this.NUM_BINS
    this.ROU = new Float32Array(n)
    for (let i = 0; i < n >> 1; ++i) {
      const j = this.ReverseBits(i, this.NUM_BITS - 1)
      this.ROU[j << 1] = cos((pi2 * i) / n)
      this.ROU[(j << 1) | 1] = -sin((pi2 * i) / n)
    }
  }
  Forward(array) {
    const n = this.NUM_BINS
    if (array.length !== 2 * n) {
      throw new Error(
        'FFTAlgorithm.Forward: array size should be ' + (2 * n).toString()
      )
    }

    for (let l = this.NUM_BINS >> 1; l > 0; l >>= 1) {
      for (let k = 0, t = 0; k < n; k += l + l, ++t) {
        const wr = this.ROU[t << 1]
        const wi = this.ROU[(t << 1) | 1]
        for (let j = k; j < k + l; ++j) {
          const xr = array[j << 1]
          const xi = array[(j << 1) | 1]
          const zr = array[(j + l) << 1]
          const zi = array[((j + l) << 1) | 1]
          const yr = wr * zr - wi * zi
          const yi = wr * zi + wi * zr
          array[j << 1] = xr + yr
          array[(j << 1) | 1] = xi + yi
          array[(j + l) << 1] = xr - yr
          array[((j + l) << 1) | 1] = xi - yi
        }
      }
    }

    for (let i = 0; i < n; ++i) {
      const j = this.BIT_REV[i]
      if (i < j) {
        const tr = array[i << 1]
        const ti = array[(i << 1) | 1]
        array[i << 1] = array[j << 1]
        array[(i << 1) | 1] = array[(j << 1) | 1]
        array[j << 1] = tr
        array[(j << 1) | 1] = ti
      }
    }
  }
}