'use strict';
const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;

var personal_info = Schema( {
  name: String,
  phone: String,
  email: String,
  f_name: String, 
  m_name: String,
  birth: String,
  about: String,
  exp_1:String,
  exp_2:String,
  exp3:String,
  skill:String
} );

module.exports = mongoose.model( 'personal_info', personal_info );