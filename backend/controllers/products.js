const Product = require("../models/Products");

const getNotRecommendedFoods = async (req, res) => {
  try {
    const bloodGroup = parseInt(req.params.bloodGroup, 10);
    if (![1, 2, 3, 4].includes(bloodGroup)) {
      return res.status(400).json({ message: "Invalid blood group" });
    }

    const products = await Product.find({
      [`groupBloodNotAllowed.${bloodGroup}`]: true,
    }).select("title").limit(4);

    const titles = products.map((p) => p.title);
    res.json(titles);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};


const searchProducts = async (req, res) => {
  try {
    const query = req.query.query || "";
    if (!query) {
      return res.status(400).json({ message: "Query param is required" });
    }

    
    const products = await Product.find({
      title: { $regex: query, $options: "i" },
    }).limit(10); 

    res.json(products);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error searching products", error: error.message });
  }
};

module.exports = {
  getNotRecommendedFoods,
  searchProducts,
};
