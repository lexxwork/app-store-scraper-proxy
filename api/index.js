const {
  router,
  get
} = require('microrouter')

var store = require('app-store-scraper');
const path = require('path');
const qs = require('querystring');
var proxyAgent = require('proxy-agent');

function replaceErrors(key, value) {
  if (value instanceof Error) {
    var error = {};
    Object.getOwnPropertyNames(value).forEach(function (key) {
      error[key] = value[key];
    });
    return error;
  }
  return value;
}

function errorHandler(error, res) {
  res.end(JSON.stringify({ error }, replaceErrors));
}

function applyProxy(req) {
  if (req.query.proxy && req.query.proxy.length > 0) {
    req.query.requestOptions = {
      agent: new proxyAgent(req.query.proxy),
      timeout: 15000
    }
    delete req.query.proxy
  }
}

module.exports = router(
  get('/app', function (req, res) {
    applyProxy(req);
    store.app(req.query)
      .then(res.json)
      .catch(err => errorHandler(err, res));
  })
);