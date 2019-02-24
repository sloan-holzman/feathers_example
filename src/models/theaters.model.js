// theaters-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const theaters = new Schema({
    name: { type: String, required: true },
    location: {
      street: { type: String, required: true},
      city: { type: String, required: true },
      state: { type: String, required: true },
      zipcode: { type: String, required: true },
      country: { type: String, default: 'USA' }
    }
  }, {timestamps: true});
  return mongooseClient.model('theaters', theaters);
};
