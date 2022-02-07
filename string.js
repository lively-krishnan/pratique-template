const um = require('./libs/utlis')

// 匹配双括号中任意字符
const REGEX = /{{(.*?)}}/g

/**
 * @param { string } input 模板字符串
 * @param { object } view 视图
 *
 * @public
 * @example
 * render(`I'm {{name}}`, {name: 'krishnan'}
 * @returns 'I'm krishnan'
 */
function render(input, view) {
  if(arguments.length === 0) return undefined

  if(typeof input !== 'string') {
    throw new TypeError('The type declaration is incorrect; it is a string')
  }

  if (typeof view !== 'object' || view == null) return input
  // 优化: 理论上搜索一些纯文本关键字时，使用 indexOf 比正则表达式更快
  if (input.indexOf('{{') === -1) return input

  return input.replace(REGEX, (node, params) => {
    const val = um.extractValueResult(params, view)
    if (typeof val === 'undefined' || val === null) {
      console.warn(`No ${params} was found for value`)
      return node
    }

    /**  这里是为了防止出现 匹配对象匹配到一个对象
     * @example
     * render(`I'm {{obj.me}}`, {
     *  obj: {
     *   me: {a: 'krishnan'}
     *  }
     * })
     * @returns 'I'm {{obj.me}}'
     */

    if (typeof val === 'object') {
      console.warn(`No ${params} was found for value`)
      return node
    }
    return val
  })
}

module.exports = render