const Model = require('../../models');
const errorMessages = require('../../constants');

beforeEach(async () => {
  await Model.forms.truncate();
});
describe('forms.generate()', () => {
  it('should insert new form', async () => {
    const formObj = {
      name: 'Personal Details',
      fields: ['First Name', 'Last Name', 'Address', 'Country'],
    };
    expect(await Model.forms.generate(formObj)).toEqual({ message: 'Created form' });
  });
  it('should give error on inserting null in "name"', async () => {
    const formObj = {
      fields: ['First Name', 'Last Name', 'Address', 'Country'],
    };
    expect(await Model.forms.generate(formObj)).toEqual({ message: 'notNull Violation: forms.name cannot be null' });
  });
  it('should give error on inserting null in "fields"', async () => {
    const formObj = {
      name: 'Personal Details',
    };
    expect(await Model.forms.generate(formObj)).toEqual({ message: 'notNull Violation: forms.fields cannot be null' });
  });
  it('should give error on inserting string with only blank spaces in "name"', async () => {
    const formObj = {
      name: ' ',
      fields: ['First Name', 'Last Name', 'Address', 'Country'],
    };
    expect(await Model.forms.generate(formObj)).toEqual({ message: `Validation error: ${errorMessages.NAME_BLANK_ERROR_MESSAGE}` });
  });
  it('should give error on inserting string without any alphabet or number in "name"', async () => {
    const formObj = {
      name: '.',
      fields: ['First Name', 'Last Name', 'Address', 'Country'],
    };
    expect(await Model.forms.generate(formObj)).toEqual({ message: `Validation error: ${errorMessages.NAME_NO_NUMBER_OR_ALPHABET_ERROR_MESSAGE}` });
  });
  it('should give error on inserting empty array in "fields"', async () => {
    const formObj = {
      name: 'Personal Details',
      fields: [],
    };
    expect(await Model.forms.generate(formObj)).toEqual({ message: `Validation error: ${errorMessages.FIELDS_EMPTY_ARRAY_ERROR_MESSAGE}` });
  });
  it('should give error on inserting string with only blank spaces as a field', async () => {
    const formObj = {
      name: 'Personal Details',
      fields: [' ', 'Last Name', 'Address', 'Country'],
    };
    expect(await Model.forms.generate(formObj)).toEqual({ message: `Validation error: ${errorMessages.FIELDS_BLANK_ERROR_MESSAGE}` });
  });
  it('should give error on inserting string without any alphabet or number as a field', async () => {
    const formObj = {
      name: 'Personal Details',
      fields: ['.', 'Last Name', 'Address', 'Country'],
    };
    expect(await Model.forms.generate(formObj)).toEqual({ message: `Validation error: ${errorMessages.FIELDS_NO_NUMBER_OR_ALPHABET_ERROR_MESSAGE}` });
  });
});
describe('forms.getNameAndCreatedDate()', () => {
  it('should get "name" and "createdAt" for all forms in database', async () => {
    const formObj1 = {
      name: 'Personal Details',
      fields: ['First Name', 'Last Name', 'Address', 'Country'],
    };
    const formObj2 = {
      name: 'Code Academy Feedback 2019',
      fields: ['What did you like?', 'What could have been improved? '],
    };
    await Model.forms.generate(formObj1);
    await Model.forms.generate(formObj2);
    const nameAndCreatedDateArr = await Model.forms.getNameAndCreatedDate();
    expect(nameAndCreatedDateArr.map(formObj => formObj.name))
      .toEqual([formObj1.name, formObj2.name]);
    expect(nameAndCreatedDateArr.map(formObj => formObj.createdAt)
      .every(createdAt => (createdAt !== undefined)))
      .toEqual(true);
  });
});
afterAll(() => Model.forms.sequelize.close());
