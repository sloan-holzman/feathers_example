const moment = require('moment')


MyModel.find({
  createdAt:
})

class SearchService {
  constructor(options) {
    this.options = options || {};
    this.app = this.options.app;
    this.timesService = this.app.service('times')
  }

  // note: there are certainly more efficient ways to do this query
  // a mongo aggregation pipeline, for example, would be faster
  async find(params) {
    const { date, theater, movie, maxRating } = params.query;
    const timesQuery = {};
    // set the date timesQuery
    const searchDate = moment(date).startOf('day')
    timesQuery.date = {
      $gte: searchDate.toDate(),
      $lte: moment(searchDate).endOf('day').toDate()
    }
    // include theater, if part of timesQuery
    if (theater) {
      timesQuery.theater = theater;
    }
    // include move, if part of timesQuery
    if (movie) {
      timesQuery.movie = movie;
    }
    // get initial results
    const matchingTimes = await this.timesService.find({query: {...timesQuery, $populate: ['movies']}});
    return matchingTimes

  }
}

module.exports = function(options) {
  return new SearchService(options);
};

module.exports.Service = SearchService;
