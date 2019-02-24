const moment = require('moment')

class SearchService {
  constructor(options) {
    this.options = options || {};
    this.app = this.options.app;
    this.timesService = this.app.service('times');
  }

  // note: there are certainly more efficient ways to do this - just for illustrations sake
  async find(params) {
    // get the query parameters from the request
    const { date, theater, title, maxRating } = params.query;
    // create the date part of the query
    const dateQuery = this.createDateQuery(date);
    // combine the three queries
    const query = { ...dateQuery, $populate: ['movie', 'theater'] };
    // get back the matching results
    debugger
    const initialResults = await this.timesService.find({query});
    // if there is a maxRating, filter by that, too
    return this.filterInitialResults(maxRating, theater, title, initialResults);
  }

  createDateQuery (date) {
    const searchDate = moment(date).startOf('day')
    return {
      date: {
        $gte: searchDate.toDate().toISOString(),
        $lte: moment(searchDate).endOf('day').toDate().toISOString()
      }
    }
  }

  filterInitialResults(maxRating, theater, title, initialResults) {
    if (maxRating || theater || title) {
      // create an array of the acceptable ratings (i.e. all the ratings up to the maxRating)
      const ratingsOrder = {
        'G': 1,
        'PG': 2,
        'PG-13': 3,
        'R': 4
      };
      const filterFunction = (time) => {
        const appropriateRating = !maxRating || ratingsOrder[time.movie.rating] <= ratingsOrder[maxRating];
        const correctTheater = !theater || (time.theater.name).match(new RegExp(theater, 'i'));
        const correctTitle = !title || (time.movie.title).match(new RegExp(title, 'i'));
        return appropriateRating && correctTheater && correctTitle;
      }
      // filter the results for only those with ratings less than or equal to the maxRating
      return initialResults.filter(filterFunction);
    }
    return initialResults;
  };
}

module.exports = function(options) {
  return new SearchService(options);
};

module.exports.Service = SearchService;
