const express = require('express');
const bodyParser = require('body-parser');

const fs = require('fs');
const { promisify } = require('util');
const { randomBytes } = require('crypto');

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

const app = express();

const movieRoutes = require('./routes/movieRouter')


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(movieRoutes);

app.listen(4000, () => {
    console.log('app is running on port 4000')
})