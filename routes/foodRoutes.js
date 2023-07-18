const express = require('express');
const foodController = require('./../controllers/foodController');
const authController = require('./../controllers/authController');

const router = express.Router();

router
  .route('/')
  .get(foodController.getAllFood)
  .post(
    authController.protect,
    authController.restrictTo('admin'),
    foodController.createFood
  );

router
  .route('/:id')
  .get(foodController.getFood)
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    foodController.deleteFood
  )
  .patch(
    authController.protect,
    authController.restrictTo('admin'),
    foodController.updateFood
  );

module.exports = router;
