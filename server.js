const Hapi = require('hapi');
const routes = require('./routes');

const server = new Hapi.Server({
  port: 8080,
  host: 'localhost',
});

server.route(routes);
if (!module.parent) {
  server.start();
}

module.exports = { server };
