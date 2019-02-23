const { filterByRatings } = require('./hooks');
const errors = require('@feathersjs/errors');

module.exports = {
  before: {
    find: [
      (context) => {
        const { date } = context.params.query;
        if (!date) {
          throw new errors.BadRequest('A date must be provided');
        }
        return context;
      }
    ]
  },

  after: {
    find: [filterByRatings]
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
