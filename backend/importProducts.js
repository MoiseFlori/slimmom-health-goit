const mongoose = require("mongoose");
const fs = require("fs");
const Product = require("./models/Products");

// 👉 Se conectează automat la baza de date prin db.js
require("./db");

const importData = async () => {
  try {
    const data = JSON.parse(fs.readFileSync("./productsCleaned.json", "utf-8"));
    await Product.insertMany(data);
    console.log("✅ Produsele au fost importate cu succes!");
    process.exit();
  } catch (err) {
    console.error("❌ Eroare la import:", err);
    process.exit(1);
  }
};

importData();
