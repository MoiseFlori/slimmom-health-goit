const fs = require("fs");

// Citește fișierul brut (de ex. exportat din MongoDB)
const rawContent = fs.readFileSync("products.json", "utf-8");

// Înlocuiește toate aparițiile de "$oid" cu doar valoarea string
const fixedJson = rawContent.replace(/"\$oid"\s*:\s*"([a-f0-9]{24})"/g, `"$1"`);

// Elimină acoladele din jurul _id (adică { "$oid": "..." } devine "...")
const finalJson = fixedJson.replace(
  /"_id"\s*:\s*{\s*"([a-f0-9]{24})"\s*}/g,
  `"_id": "$1"`
);

// Salvează un fișier nou curățat
fs.writeFileSync("productsCleaned.json", finalJson);

console.log("✅ Fișierul a fost curățat cu succes.");
