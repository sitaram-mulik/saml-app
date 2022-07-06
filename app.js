const express = require('express');
const helmet = require('helmet');
const passport = require('./passport-middleware.js');



const router = require('./router');

//const { errorHandler } = require('./server/v1/middlewares');

const app = express();

app.use(express.urlencoded({
  extended: true,
}));

app.use(express.json({ limit: '15mb' }));
app.use(helmet());

app.use(passport.initialize());
app.use(passport.session());

//= ==========Registering Router==========
app.use('/saml/', router);

//= ======ERROR Handler
//app.use(errorHandler);

app.listen(9000, () => {
    console.log(`Example app listening at http://localhost:9000`)
  })

module.exports = app;