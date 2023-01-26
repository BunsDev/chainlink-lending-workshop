'use strict';

const price = require('./apis/price')

const Router = require('koa-router')
const router = new Router()

const noop = require('./apis/noop')

router.get('/price/:symbol', price.tokenPrice)
router.get('/prices', price.tokenPrices)

router.get('/', noop)

module.exports = router