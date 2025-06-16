const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  calories: {
    type: Number,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
  categories: {
    type: String,
    required: true,
  },
  groupBloodNotAllowed: {
    type: [Boolean], 
    validate: (v) => Array.isArray(v) && v.length === 5,
    default: [null, true, true, true, true],
  },
});

productSchema.index({ title: 1 });

module.exports = mongoose.model("Product", productSchema);
