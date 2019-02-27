const Model = require('../../../models');
const { server } = require('../../../server');

describe('the "forms" route at GET call', () => {
  let response;
  const formObj1 = {
    name: 'Personal Details',
    fields: ['First Name', 'Last Name', 'Address', 'Country'],
  };
  const formObj2 = {
    name: 'Code Academy Feedback 2019',
    fields: ['What did you like?', 'What could have been improved? '],
  };
  beforeAll(async () => {
    const options = {
      method: 'GET',
      url: '/forms',
    };
    await Model.forms.truncate();

    await Model.forms.generate(formObj1);
    await Model.forms.generate(formObj2);
    response = await server.inject(options);
  });

  it('should respond with 200', async () => {
    expect(response.statusCode).toEqual(200);
  });
  it('should respond with array of forms in database', () => {
    expect(response.result.map(formObj => formObj.name))
      .toEqual([formObj1.name, formObj2.name]);
    expect(response.result.map(formObj => formObj.createdAt)
      .every(createdAt => (createdAt !== undefined)))
      .toEqual(true);
  });
  afterAll(() => {
    Model.forms.sequelize.close();
  });
});
