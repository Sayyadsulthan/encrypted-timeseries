const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    origin: {
      type: String,
      require: true,
    },
    destination: {
      type: String,
      require: true,
    },
    secret_key: {
      type: String,
      require: true,
    },
    date: {
      type: Date,
    },
  },
  { timeseries: true }
);

const DataStore = mongoose.model("DataStore", dataSchema);

module.exports = DataStore;
