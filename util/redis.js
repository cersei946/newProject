var redisConfig = require('../config/config').redisConfig;
var redis = require('redis');

/* redis */
var opitons = {};
opitons.db = redisConfig.db;
if (redisConfig.password) opitons.password = redisConfig.password;

var client = redis.createClient(redisConfig.port, redisConfig.host, opitons);


client.on('error', function (err) {
  console.error('Redis Error {' + err + '}');
});

client.setValueWithExpire = function (k, v, expire) {
  client.set(k, v, client.print);
  client.expire(k, parseInt(expire), client.print);
};

module.exports = client;
