const Food = require('../models/foodModel');
const handler = require('./handlerFactory');


exports.createFood = handler.createOne(Food);
exports.getAllFood = handler.getAll(Food);
exports.getFood = handler.getOne(Food);
exports.deleteFood = handler.deleteOne(Food);
exports.updateFood = handler.updateOne(Food);