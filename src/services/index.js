const movies = require('./movies/movies.service.js');
const theaters = require('./theaters/theaters.service.js');
const times = require('./times/times.service.js');
const search = require('./search/search.service.js');
module.exports = function () {
  const app = this; // eslint-disable-line no-unused-vars
  app.configure(movies);
  app.configure(theaters);
  app.configure(times);
  app.configure(search);
};
