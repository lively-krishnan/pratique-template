describe('string-test', () => {
  const render = require('../string')

  function verify(title, input, output) {
    it(title, function () {
      const result = render.apply(render, input);
      console.log(result,'==2==2=2')
      eval(`expect('${result}').${output}`)
    });
  }
  verify(
    '验证纯字符串输入',
    [`hello world`],
    "toBe('hello world')"
  )

  verify(
    '验证对象,以及空格',
    [`{{ name }}`,{ name: 'krishnan' }],
    "toBe('krishnan')"
  )

  verify(
    '验证嵌套对象',
    [`{{ privateInfo.a.b.c }}`, { privateInfo: { a: { b: { c: 18}} }}],
    "toBe('18')"
  )

  verify(
    '验证视图对象内是否存在模板内需要的字符, 以及视图中是否未找到',
    [`{{ privateInfo.age }}`, { privateInfo: {} }],
    "toBe('{{ privateInfo.age }}')"
  )

})


