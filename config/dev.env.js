'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  FRONTEND_PORT: 8082,
  // BACKEND_DOMAIN: 'ec2-13-125-140-17.ap-northeast-2.compute.amazonaws.com',
  BACKEND_PORT: 8080,
  
})
