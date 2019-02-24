// times-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const times = new Schema({
    date: { type: Date, required: true },
    // references the _id of a document in the "theaters" collection
    theater: { type: Schema.Types.ObjectId, required: true, ref: 'theaters' },
    // references the _id of a document in the "movies" collection
    movie: { type: Schema.Types.ObjectId, required: true, ref: 'movies' }
  }, {
    timestamps: true
  });

  return mongooseClient.model('times', times);
};
