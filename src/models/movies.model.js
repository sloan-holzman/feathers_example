// movies-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const movies = new Schema({
    title: { type: String, required: true },
    rating: { type: String, required: true, enum: ['G', 'PG', 'PG-13', 'R'] },
    description: { type: String },
    searches: { type: Number, default: 0 }
  }, {timestamps: true});

  return mongooseClient.model('movies', movies);
};
