'use strict';
const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;

var personal_info = Schema( {
  name: String,
  phone: String,
  address: String,
  github:String,
  email: String,
  coll_name: String,
  major: String,
  major2: String,
  gpa: String,
  start: String,
  grad: String,
  courses: String,
  about: String,
  intern1: String,
  int_position1: String,
  intern2: String,
  int_position2: String,
  intern3: String,
  int_position3: String,
  research1: String,
  res_position1: String,
  research2: String,
  res_position2: String,
  research3: String,
  res_position3: String,
  exp_1: String,
  exp_2: String,
  exp_3: String,
  honor: String,
  skill: String,
  language1: String,
  language1_pro: String,
  language2: String,
  language2_pro: String,
  extra1: String,
  extra2: String,
  extra3: String
} );

module.exports = mongoose.model( 'personal_info', personal_info );