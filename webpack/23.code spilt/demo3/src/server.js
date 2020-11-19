/**
 * 服务器代码
 * 启动服务器: node serve.js
 * 访问服务器地址:localhost:3000
 */
const express = require('express')
const app = express()

app.use(express.static('build', {
  maxAge: 1000 * 3600
}))

app.listen(3000)