const express = require('express');
const authController = require('./../controllers/authController');
const viewsController = require('./../controllers/viewsController');
const userController = require('./../controllers/userController');

const router = express.Router();

router.get('/', authController.isLoggedIn, viewsController.getOverview);
router.get('/signup', authController.isLoggedIn, viewsController.signup);
router.get('/myintake', authController.protect, viewsController.intake);
router.get('/me', authController.protect, viewsController.getme);

module.exports = router;
