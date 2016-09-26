/**
 * Our Schema for Users
 */
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var Schema = mongoose.Schema;

// Define the User Schema
var threadSchema = new Schema({
    username: {type: String, required: true},
    title: { type: String, required: true },
    content: { type: String, required: true },
    comentaries: { } // for extra information you may / may not want
});

// The primary user model
var Thread = mongoose.model('Thread', threadSchema);

module.exports = Thread;