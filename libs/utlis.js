const StaticProperty = require('./_shared/static-property')

class UtilsModule extends StaticProperty {
  /**
   * @function extractValueResult 提取值结果
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
   extractValueResult(params, view) {
    if(arguments.length === 0) return undefined
    if (view && view[params]) return view[params]

    const r = params.split('.')
    while (view && r.length) {
      const firstVal = r.shift()
      view = typeof view === 'object' && firstVal in view ? view[firstVal] : undefined
    }

    return view
  }
  // 第一个子表达式替换内容
  replaceSubexpression(input, view){
     return input.replace(this.matchDoubleBraceREGX, (node, params) => {

      const val = this.extractValueResult(params, view)
      if (val == null || typeof val === 'object') {
         console.log(`No "{{ ${params} }}" was found for value`)
        return node
      }

      return val
    })
  }
}

module.exports = new UtilsModule()