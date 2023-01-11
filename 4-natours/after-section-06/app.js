const express = require('express');
const morgan = require('morgan');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();



// 1) MIDDLEWARES
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next, val) => {
console.log(val);
next();
})

 app.use((req, res, next) => {
   console.log('Hello from the middleware 👋');
   console.log(req.params)
   next(); // always have the next() in middleware or it will stop executing here.
 });

 app.use((req, res, next) => {
   req.requestTime = new Date().toISOString();
   next();
 });

 app.get("/", (req, res) => {
    // req
   console.log(req)
 res
   .status(200)
    // .json({ message: "Hello from the server side!"})
   .send({message: req.protocol})
 })

app.get("/:id", (req, res) => {
  // console.log(req.body)
  console.log(req.params['id'])
  res
  // res.send()
   .send({data: req.params['id']})
})

// 3) ROUTES
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
