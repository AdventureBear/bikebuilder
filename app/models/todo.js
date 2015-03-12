/**
 * Created by suzanne on 3/12/15.
 */
// define todo model
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var TodoSchema   = new Schema({
    text: String
});

module.exports = mongoose.model('Todo', TodoSchema);

