// Initializes the `theaters` service on path `/theaters`
const createService = require('feathers-mongoose');
const createModel = require('../../models/theaters.model');
const hooks = require('./theaters.hooks');
const filters = require('./theaters.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'theaters',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/theaters', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('theaters');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
