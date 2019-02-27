module.exports = [{
  method: 'GET',
  path: '/ping',
  handler: (request, h) => h.response('pong').code(200),
}];
