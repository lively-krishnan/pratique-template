/**
 * 提取值
 * @private
 * @example
 * // 返回正确的值 return 'hello world'
 * extractVal('obj.a', {
 *   obj:{
 *     a: 'hello world'
 *   }
 * })
 * // 返回错误的值 return undefined
 * extractVal('obj.a', {name: 2})
 */
function extractVal(params, view) {
  if (view && view[params]) return view[params]
  const r = params.split('.')
  while (view && r.length) {
    const p = r.shift()
    view = typeof view === 'object' && p in view ? view[p] : undefined
  }

  return view
}

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
  if (typeof view !== 'object' || view == null) return input
  // 优化: 理论上搜索一些纯文本关键字时，使用 indexOf 比正则表达式更快
  if (input.indexOf('{{') === -1) return input

  const REGEX = /{{(.*?)}}/g
  return input.replace(REGEX, (node, params) => {
    const val = extractVal(params, view)
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