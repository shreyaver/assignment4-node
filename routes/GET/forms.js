const Model = require('../../models');

module.exports = [{
  method: 'GET',
  path: '/forms',
  config: {
    cors: {
      origin: ['*'],
      additionalHeaders: ['cache-control', 'x-requested-with'],
    },
  },
  handler: async (request, h) => {
    try {
      return h.response(await Model.forms.getNameAndCreatedDate()).code(200);
    } catch (errorObj) {
      return h.response(errorObj.message).code(200);
    }
  },
}];
