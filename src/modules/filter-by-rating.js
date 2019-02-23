

// filter by maxRatings, if necessary
if (maxRating) {
  // set the ratings lookup
  const ratingsOrder = {
    'G': 1,
    'PG': 2,
    'PG-13': 3,
    'R': 4
  }
  const acceptableRatings = Object.keys(ratingsOrder).filter(rating => {
    const maxRatingNumber = ratingsOrder[maxRatings]
    return ratingsOrder[rating] <= maxRatingNumber;
  })

  return matchingTimes.filter(viewing => acceptableRatings.includes(viewing.movies.rating))
}
