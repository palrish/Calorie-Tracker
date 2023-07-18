const User = require('../models/userModel');
const Food = require('../models/foodModel');
const handler = require('./handlerFactory');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getAllUser = handler.getAll(User);
exports.getUser = handler.getOne(User);
exports.updateUser = handler.updateOne(User);
exports.deleteUser = handler.deleteOne(User);

exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

const filterObj = (body, ...fields) => {
  let filteredBody = {};
  fields.forEach((el) => {
    filteredBody[el] = body[el];
  });
  return filteredBody;
};

exports.updateMe = catchAsync(async (req, res, next) => {
  if (req.body.password || req.body.passwordConfirm) {
    return next(new AppError('this route is not for password update.', 404));
  }
  const filteredBody = filterObj(req.body, 'name', 'email');
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    status: 'success',
    user: updatedUser,
  });
});

exports.updateCalorie = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.body.id);
  req.body.food = req.body.food.charAt(0).toUpperCase() + req.body.food.slice(1);
  const food = await Food.findOne({ name: req.body.food });
  if (!food) {
    return next(new AppError('Please enter the valid food item', 400));
  }
  const calorie = user.calorie * 1 + food.calorie * 1;
  await User.findByIdAndUpdate(req.body.id, { calorie });
  res.status(200).json({
    status: 'success',
  });
});
