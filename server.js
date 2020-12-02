const connect = require('connect');
const api = require('./api/index');
const app = connect();

app.use(function (req, res, next) {
  res.setHeader('Content-Type', 'application/json; charset=utf-8')
  res.json = function (obj) {
    return res.end(JSON.stringify(obj))
  }
  next()
})

app.use(api);

app.listen(3000)

console.log('server started at http://locahost:3000');
