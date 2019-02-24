const moment = require('moment')

// note: there are certainly more efficient ways to do this - just for illustrations sake
class SearchService {
  constructor(options) {
    this.options = options || {};
    this.app = this.options.app;
    this.timesService = this.app.service('times');
  }

  // find is the only publically accessible method - the rest are only used internally
  async find(params) {
    // get the query parameters from the request
    const { date, theater, title, maxRating } = params.query;
    // create the date part of the query
    const dateQuery = this.createDateQuery(date);
    // create the full query, including a request to "populate" the movie and theater that are referenced
    const query = { ...dateQuery, $populate: ['movie', 'theater'] };
    // make the query to timesService and get back the results
    // in the "find" method, you must provide a params and query key within the params
    const initialResults = await this.timesService.find({query});
    // then, filter these intiial results further
    return this.filterInitialResults(maxRating, theater, title, initialResults);
  }

  createDateQuery (date) {
    // using the moment library, create a date out of the string provided in the query
    const searchDate = moment(date).startOf('day')
    // and return a query that gets all dates that are
    // greater than or equal to ($gte) the start of the date AND
    // less than equal to ($lte) the end of the day
    // and convert to ISOString, as that is how they are saved in the DB
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
        // if there is a 'maxRating' provided, include if the movie's rating is less than the max rating
        const appropriateRating = !maxRating || ratingsOrder[time.movie.rating] <= ratingsOrder[maxRating];
        // if there is a 'theater' provided, include if the theater's name includes the 'theater' string (case insensitive)
        const correctTheater = !theater || (time.theater.name).match(new RegExp(theater, 'i'));
        // if there is a 'title' provided, include if the movie's title includes the 'title' string (case insensitive)
        const correctTitle = !title || (time.movie.title).match(new RegExp(title, 'i'));
        // return true if all three conditions are satisfied
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
