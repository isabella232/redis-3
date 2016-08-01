"use strict";

const tap = require('tap');
const requireInject = require('require-inject');
const redisMock = require('redis-mock');
const redis = requireInject('../', {
  redis: redisMock
});

tap.test('uses promises to set/get values in redis', t => {
  let client = redis.createClient("redis://localhost:6379");

  client.setAsync('boom', 'foo')
    .then(() => {
      client.getAsync('boom')
        .then(resp => {
          t.equal(resp, 'foo');
          t.done();
        })
    });
});
