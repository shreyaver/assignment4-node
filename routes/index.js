const pingRoute = require('./GET/ping.js');
const postFormRoute = require('./POST/form.js');

module.exports = [...pingRoute, ...postFormRoute];
