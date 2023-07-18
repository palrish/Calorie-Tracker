const express = require('express');
const morgan = require('morgan');
const path = require('path');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const app = express();

const globalErrorHandler = require('./controllers/errorController');

const foodRouter = require('./routes/foodRoutes');
const userRouter = require('./routes/userRoutes');
const viewsRouter = require('./routes/viewsRoutes');

app.use(express.json());
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use(helmet());
app.use(cookieParser());
app.use(express.static('public'));

app.use((req, res, next) => {
  console.log(req.cookies);
  next();
});

app.use('/api/v1/foods', foodRouter);
app.use('/api/v1/users', userRouter);
app.use('/', viewsRouter);

app.use(globalErrorHandler);
module.exports = app;
