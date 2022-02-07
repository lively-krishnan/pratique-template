class UtilsModule {
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
      const p = r.shift()
      view = typeof view === 'object' && p in view ? view[p] : undefined
    }

    return view
  }
}

module.exports = new UtilsModule()