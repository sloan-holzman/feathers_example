const filterByRatings = (context) => {
  const maxRating = context.params.query && context.params.query.maxRating;
  if (maxRating) {
    // set the ratings lookup
    const ratingsOrder = {
      'G': 1,
      'PG': 2,
      'PG-13': 3,
      'R': 4
    };
    // create an array of the acceptable ratings (i.e. all the ratings up to the maxRating)
    const acceptableRatings = Object.keys(ratingsOrder).filter(rating => {
      const maxRatingNumber = ratingsOrder[maxRating];
      return ratingsOrder[rating] <= maxRatingNumber;
    });
    const initialResult = context.result;
    // filter the results for only those with ratings less than or equal to the maxRating
    context.result = initialResult.filter(viewing => acceptableRatings.includes(viewing.movies.rating));
  }
  return context;
};

module.exports = {
  filterByRatings
};
