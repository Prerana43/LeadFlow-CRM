const mongoose = require("mongoose");

const leadSchema = new mongoose.Schema({

  companyName: String,

  clientName: String,

  email: String,

  status: String,

  dealValue: Number,

});

module.exports = mongoose.model(
  "Lead",
  leadSchema
);