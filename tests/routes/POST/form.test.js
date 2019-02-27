const Model = require('../../../models');
const { server } = require('../../../server');
const errorMessages = require('../../../constants');

beforeEach(async () => {
  await Model.forms.truncate();
});
describe('"form" route at POST call', () => {
  it('should insert new form and give message', async () => {
    const formObj = {
      name: 'Personal Details',
      fields: ['First Name', 'Last Name', 'Address', 'Country'],
    };
    const options = {
      method: 'POST',
      url: '/form',
      payload: formObj,
    };
    const serverResponse = await server.inject(options);
    expect(serverResponse.statusCode).toEqual(200);
    expect(serverResponse.result).toEqual({ message: 'Created form' });
  });
  it('should give error on inserting null in "name"', async () => {
    const formObj = {
      fields: ['First Name', 'Last Name', 'Address', 'Country'],
    };
    const options = {
      method: 'POST',
      url: '/form',
      payload: formObj,
    };
    const serverResponse = await server.inject(options);
    expect(serverResponse.result.statusCode).toEqual(400);
    expect(serverResponse.result.message).toEqual('Invalid request payload input');
  });
  it('should give error on inserting null in "fields"', async () => {
    const formObj = {
      name: 'Personal Details',
    };
    const options = {
      method: 'POST',
      url: '/form',
      payload: formObj,
    };
    const serverResponse = await server.inject(options);
    expect(serverResponse.result).toEqual({ message: 'notNull Violation: forms.fields cannot be null' });
  });
  it('should give error on inserting string with only blank spaces in "name"', async () => {
    const formObj = {
      name: ' ',
      fields: ['First Name', 'Last Name', 'Address', 'Country'],
    };
    const options = {
      method: 'POST',
      url: '/form',
      payload: formObj,
    };
    const serverResponse = await server.inject(options);
    expect(serverResponse.statusCode).toEqual(200);
    expect(serverResponse.result).toEqual({ message: `Validation error: ${errorMessages.NAME_BLANK_ERROR_MESSAGE}` });
  });
  it('should give error on inserting string without any alphabet or number in "name"', async () => {
    const formObj = {
      name: '.',
      fields: ['First Name', 'Last Name', 'Address', 'Country'],
    };
    const options = {
      method: 'POST',
      url: '/form',
      payload: formObj,
    };
    const serverResponse = await server.inject(options);
    expect(serverResponse.statusCode).toEqual(200);
    expect(serverResponse.result).toEqual({ message: `Validation error: ${errorMessages.NAME_NO_NUMBER_OR_ALPHABET_ERROR_MESSAGE}` });
  });
  it('should give error on inserting empty array in "fields"', async () => {
    const formObj = {
      name: 'Personal Details',
      fields: [],
    };
    const options = {
      method: 'POST',
      url: '/form',
      payload: formObj,
    };
    const serverResponse = await server.inject(options);
    expect(serverResponse.result.statusCode).toEqual(400);
    expect(serverResponse.result.message).toEqual('Invalid request payload input');
  });
  it('should give error on inserting string with only blank spaces as a field', async () => {
    const formObj = {
      name: 'Personal Details',
      fields: [' ', 'Last Name', 'Address', 'Country'],
    };
    const options = {
      method: 'POST',
      url: '/form',
      payload: formObj,
    };
    const serverResponse = await server.inject(options);
    expect(serverResponse.statusCode).toEqual(200);
    expect(serverResponse.result).toEqual({ message: `Validation error: ${errorMessages.FIELDS_BLANK_ERROR_MESSAGE}` });
  });
  it('should give error on inserting string without any alphabet or number as a field', async () => {
    const formObj = {
      name: 'Personal Details',
      fields: ['.', 'Last Name', 'Address', 'Country'],
    };
    const options = {
      method: 'POST',
      url: '/form',
      payload: formObj,
    };
    const serverResponse = await server.inject(options);
    expect(serverResponse.statusCode).toEqual(200);
    expect(serverResponse.result).toEqual({ message: `Validation error: ${errorMessages.FIELDS_NO_NUMBER_OR_ALPHABET_ERROR_MESSAGE}` });
  });
});
afterAll(() => {
  Model.forms.sequelize.close();
});
