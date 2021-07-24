const mongoose = require("mongoose");
require("dotenv").config();

const connect = () =>
  mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  });

module.exports = connect;
