# pratique-template
Some processing methods for templates

## variable substitution:
```
const render = require('pratique-template/string')
render(`I'm {{name}}`, {name: 'krishnan'}) // 'I'm krishnan'  
```