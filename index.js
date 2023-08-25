require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT || 3000;
const cors = require('cors');
const db=require('./db/index');


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
require('./routes')(app);

app.listen(port, () => {
  console.log(`Server is listening at port ${port}`)
})