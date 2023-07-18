const express = require('express');
const intakeController = require('./../controllers/intakeController');
const authController = require('./../controllers/authController');

const router = express.Router({ mergeParams: true });

router.use(authController.protect);

router
  .route('/')
  .get(intakeController.getAllIntake)
  .post(
    authController.protect,
    authController.restrictTo('user'),
    intakeController.setUserFoodId,
    intakeController.createIntake
  );

router
  .route('/:id')
  .get(intakeController.getIntake)
  .patch(
    authController.restrictTo('user', 'admin'),
    intakeController.updateIntake
  )
  .delete(
    authController.restrictTo('user', 'admin'),
    intakeController.deleteIntake
  );

module.exports = router;