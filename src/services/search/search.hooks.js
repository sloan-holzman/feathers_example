const errors = require('@feathersjs/errors');

module.exports = {
  before: {
    find: [
      (context) => {
        const { date } = context.params.query;
        // throw an error if a date is not provided
        if (!date) {
          throw new errors.BadRequest('A date must be provided');
        }
        return context;
      }
    ]
  },

  after: {
    find: [
      // this function helps keep track of the times that each movie was searched for
      async (context) => {
        // find all the the movies that came back in the search
        const ids = context.result.map(showing => showing.movie._id);
        // then increase the "search" count on each of those movies by 1
        ids.forEach(async(id) => {
          // by updating the movie record with searches++
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
