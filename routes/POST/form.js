const Joi = require('joi');
const Model = require('../../models');

module.exports = [{
  method: 'POST',
  path: '/form',
  config: {
    validate: {
      payload: {
        name: Joi.string().required(),
        fields: Joi.array().items(Joi.string().required()),
      },
    },
    cors: {
      origin: ['*'],
      additionalHeaders: ['cache-control', 'x-requested-with'],
    },
  },
  handler: async (request, h) => {
    try {
      return h.response(await Model.forms.generate(request.payload)).code(200);
    } catch (errorObj) {
      return h.response(errorObj.message).code(200);
    }
  },
}];
