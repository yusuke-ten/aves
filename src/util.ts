/**
 * @param {number} r Red
 * @param {number} g Green
 * @param {number} b Blue
 * @param {number} a Alpha, default 1
 * @returns {string} CSS rgba() string
 */
export function createColor(r: number, g: number, b: number, a: number = 1): string {
  return `rgba(${r}, ${g}, ${b}, ${a})`
}

/**
 *
 * フォント情報ストリングを作成する、後々ヘルパーとかに切り分けたほうがいい
 * @param {string} fontSize
 * @param {string} [type='']
 * @param {string} [font='sans-serif']
 * @returns {string}
 */
export function createFont(fontSize: string, type: string = '', font: string = 'sans-serif'): string {
  return `${type} ${fontSize} ${font}`
}

/**
 * @param {number} num
 * @returns 入力された数値の桁数を返す
 */
export function seekDigit(num: number) {
  return Math.LOG10E * Math.log(num)
}
