# pratique-template
🚀 Replace template character


## Quickly understand:
```
const render = require('pratique-template/string')

render(`I'm {{name}}, a {{privateInfo.age}} old`, {
  name: 'krishnan', 
  privateInfo:{ age: 18 }
}) // 'I'm krishnan, a 18 old'

```