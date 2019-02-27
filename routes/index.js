const pingRoute = require('./GET/ping.js');
const postFormRoute = require('./POST/form.js');
const getFormsRoute = require('./GET/forms.js');

module.exports = [...pingRoute, ...postFormRoute, ...getFormsRoute];
