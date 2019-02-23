// Initializes the `times` service on path `/times`
const createService = require('feathers-mongoose');
const createModel = require('../../models/times.model');
const hooks = require('./times.hooks');
const filters = require('./times.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'times',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/times', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('times');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
