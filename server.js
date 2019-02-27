const Hapi = require('hapi');

const server = new Hapi.Server({
  port: 8080,
  host: 'localhost',
});

if (!module.parent) {
  server.start();
}

module.exports = { server };
