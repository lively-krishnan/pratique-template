/**
 * @function extractValueResult 提取值结果
 * @private
 */
function extractValueResult(params, view) {
  if (arguments.length === 0) return undefined
  if (view && view[params]) return view[params]

  const r = params.split('.')
  while (view && r.length) {
    const firstVal = r.shift()
    view = typeof view === 'object' && firstVal in view ? view[firstVal] : undefined
  }

  return view
}

const matchDoubleBraceREGX = /{{(.*?)}}/g

/**
 * @function replaceSubexpression 替换第一个子表达式内容
 * @privte
 */
function replaceSubexpression(input, view) {
  return input.replace(matchDoubleBraceREGX, (node, params) => {

    const val = extractValueResult(params.trim(), view)
    if (val == null || typeof val === 'object') {
      console.log(`No "{{ ${params} }}" was found for value`)
      return node
    }

    return val
  })
}

/**
 * @param { string } input 模板字符串
 * @param { object } view 视图
 *
 * @public
 * @example
 * render(`I'm {{name}}, a {{privateInfo.age}} old`, {name: 'krishnan', privateInfo:{ age: 18 }})
 * @returns 'I'm krishnan, a 18 old'
 */
function render(input, view) {
  if(arguments.length === 0) return undefined

  if(typeof input !== 'string') {
    throw new TypeError('The type declaration is incorrect; it is a string')
  }

  if (typeof view !== 'object' || view == null) return input

  // 优化: 理论上搜索一些纯文本关键字时，使用 indexOf 比正则表达式更快
  if (input.indexOf('{{') === -1) return input
  
  return replaceSubexpression(input, view)
}

module.exports = render