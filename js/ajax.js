const request = require('request')
request.post('https://www.epoos.com').then(res => {
  console.log(res)
})