const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const Food = require('./../models/foodModel');

exports.getOverview = catchAsync(async (req, res, next) => {
  res.status(200).render('overview');
});

exports.signup = catchAsync(async (req, res, next) => {
  res.status(200).render('signup');
});

exports.intake = catchAsync(async (req, res, next) => {
  const foods = await Food.find();
  res.status(200).render('myIntake', { foods, user: res.locals.user });
});

exports.getme = catchAsync(async (req, res, next) => {
  res.status(200).render('account');
});
