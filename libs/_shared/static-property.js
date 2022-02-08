class StaticProperty {
  constructor() {
    // 匹配双括号内容正则
    this.matchDoubleBraceREGX = /{{(.*?)}}/g
  }
}

module.exports = StaticProperty