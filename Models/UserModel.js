'use strict';

var mongoose = require('mongoose');

var md5 = require('md5');

var validator = require('validator');


var Schema = mongoose.Schema;

var UserSchema = new Schema({

    email: { type: String, required: true, unique: true},

    first_name: {type : String , required:true },

    last_name: {type : String , required:true },

    password: { type: String, required: true },

    created_at: Date,

    updated_at: Date

});


// encrypts password with md5
UserSchema.methods.EncryptPasword = function() {
  
  this.password = md5(this.password ) ;  

  return this.password ;
};


// on every save, add the date
UserSchema.pre('save', function(next) {

  var currentDate = new Date();
 
  this.updated_at = currentDate;

  if (!this.created_at)
    this.created_at = currentDate;

  next();
});


mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/node-login', { useMongoClient: true });

module.exports = mongoose.model('User', UserSchema);