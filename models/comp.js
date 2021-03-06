const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const compSchema = new Schema({
username: {
        type: String,
        required: true
},
description: {
        type: String,
        required: true
},
  password: {
        type: String,
        required: true
  },
tagline: {
        type: String,
        required: true
}  
});

module.exports = mongoose.model('Comp', compSchema);
