const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const datasRoutes = require('./routes/datas');
const { mongoURI } = require('./config');

const app = express();


app.use(bodyParser.json());
app.use(cors());


app.use('/', datasRoutes);


mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
