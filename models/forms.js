const errorMessages = require('../constants');

module.exports = (sequelize, DataTypes) => {
  const forms = sequelize.define('forms', {
    name: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true,
      validate: {
        validateName: (value) => {
          if (/^\s+$/.test(value)) {
            throw new Error(errorMessages.NAME_BLANK_ERROR_MESSAGE);
          }
          if (!/[a-z]|[0-9]+/i.test(value)) {
            throw new Error(errorMessages.NAME_NO_NUMBER_OR_ALPHABET_ERROR_MESSAGE);
          }
        },
      },
    },
    fields: {
      allowNull: false,
      type: DataTypes.ARRAY(DataTypes.STRING),
      validate: {
        validateFields: (value) => {
          if (value.length === 0) {
            throw new Error(errorMessages.FIELDS_EMPTY_ARRAY_ERROR_MESSAGE);
          }
          if (value.some(field => /^\s+$/.test(field))) {
            throw new Error(errorMessages.FIELDS_BLANK_ERROR_MESSAGE);
          }
          if (value.some(field => !/[a-z]|[0-9]+/i.test(field))) {
            throw new Error(errorMessages.FIELDS_NO_NUMBER_OR_ALPHABET_ERROR_MESSAGE);
          }
        },
      },
    },
  }, {});
  forms.generate = async (formObj) => {
    try {
      await forms.create(formObj);
      return { message: 'Created form' };
    } catch (errorObj) {
      return { message: errorObj.message };
    }
  };
  forms.getNameAndCreatedDate = async () => {
    try {
      const responses = await forms.findAll({ attributes: ['name', 'createdAt'] });
      return responses;
    } catch (errorObj) {
      return errorObj.message;
    }
  };
  return forms;
};
