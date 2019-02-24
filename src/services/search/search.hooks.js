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
    find: [
      // keep track of all the times that each of the movies came up in a search
      async (context) => {
        // find all the the movies that came back in the search
        const ids = context.result.map(showing => showing.movie._id);
        // then increase the "search" count on each of those movies by 1
        ids.forEach(async(id) => {
          await context.app.service('movies').patch(id, {$inc: {searches: 1}});
        })
        return context;
      }
    ]
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
