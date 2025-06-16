const DiaryEntry = require("../models/DiaryEntry");
const Product = require("../models/Products");

const getDayInfo = async (req, res) => {
  const userId = req.user._id;
  const { date } = req.query;

  const entries = await DiaryEntry.find({ user: userId, date }).populate(
    "product"
  );

  const totalCalories = entries.reduce((sum, entry) => sum + entry.calories, 0);

  res.json({
    meals: entries.map((entry) => ({
      _id: entry._id,
      grams: entry.grams,
      calories: entry.calories,
      product: {
        _id: entry.product._id,
        title: entry.product.title,
      },
    })),
    totalCalories, 
  });
};

const addProductToDay = async (req, res) => {
  try {
    const { productId, grams, date } = req.body;
    const userId = req.user._id;

    const foundProduct = await Product.findById(productId);
    if (!foundProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    const caloriesPer100g = foundProduct.calories;
    const calories = (caloriesPer100g * grams) / 100;

    const newEntry = await DiaryEntry.create({
      user: userId,
      product: foundProduct._id,
      date,
      grams,
      calories,
    });

    res.status(201).json(newEntry);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error adding product", error: error.message });
  }
};

const getDiaryByDate = async (req, res) => {
  try {
    const userId = req.user._id;
    const { date } = req.query;
    const entry = await DiaryEntry.find({ user: userId, date }).populate(
      "product",
      "title calories"
    );

    const totalCalories = entry.reduce((sum, e) => sum + e.calories, 0);

    res.status(200).json({
      meals: entry,
      totalCalories,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching diary", error: error.message });
  }
};
const deleteProductFromDay = async (req, res) => {
  try {
    const userId = req.user._id;
    const { id } = req.params;

    const entry = await DiaryEntry.findOneAndDelete({
      _id: id,
      user: userId,
    });

    if (!entry) {
      return res.status(404).json({ message: "Entry not found" });
    }

    const remainingEntries = await DiaryEntry.find({
      user: userId,
      date: entry.date,
    }).populate("product", "title calories");

    const totalCalories = remainingEntries.reduce(
      (sum, e) => sum + e.calories,
      0
    );

    res.json({
      message: "Entry deleted",
      meals: remainingEntries.map((e) => ({
        _id: e._id,
        grams: e.grams,
        calories: e.calories,
        product: {
          _id: e.product._id,
          title: e.product.title,
        },
      })),
      totalCalories,
    });
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  getDayInfo,
  addProductToDay,
  deleteProductFromDay,
  getDiaryByDate,
};
