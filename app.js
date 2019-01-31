const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Define middlewares.
app.use(cors());
app.use(bodyParser.urlencoded({extended: true, limit: '1024mb'}));
app.use(bodyParser.json({limit: '1024mb'}));

// Routes.
const appRouter = require('./routes/index');
app.use('/api',appRouter);

app.listen(PORT,console.log('App is running on port: ' + PORT));