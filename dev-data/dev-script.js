const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Food = require('./../models/foodModel');
const fs = require('fs');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB)
  .then(console.log('DB CONNECTED SUCCESFULLY!!'))
  .catch(() => console.log('DB NOT CONNECTED'));

const foods = JSON.parse(
  fs.readFileSync(`${__dirname}/foods.json`, 'utf-8')
);
const insertData = async () => {
  try {
    await Food.create(foods);
    // await User.create(users, {validateBeforeSave: false});
    // await Review.create(reviews);
    console.log('Data Added Successfully!!');
  } catch (err) {
    console.log('Some Error Occured!!');
  }
  process.exit();
};

const deleteData = async () => {
  try {
    await Food.deleteMany();
    // await User.deleteMany();
    // await Review.deleteMany();
    console.log('Data deleted Successfully!!');
  } catch (err) {
    console.log('Some Error Occured!!');
  }
  process.exit();
};
// deleteData();
insertData();
// console.log(process.args);

// if (process.args[2] === '--import') {
//   insertData();
// } else if (process.args[2] === '--delete') {
//   deleteData();
// }