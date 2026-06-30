const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Persistent products (in memory for now - later we can use database)
let products = [
  { id: 'fivem', game: 'FiveM', title: 'FiveM External Mod', desc: 'Full external menu', price: 29.99 },
  { id: 'roblox', game: 'Roblox', title: 'Roblox External Mod', desc: 'Executor alternative', price: 0 },
];

// Get all products
app.get('/products', (req, res) => res.json(products));

// Admin - Add new product
app.post('/admin/products', (req, res) => {
  const newProduct = req.body;
  products.push(newProduct);
  res.json({ success: true, products });
});

// Admin - Update product
app.put('/admin/products/:id', (req, res) => {
  const id = req.params.id;
  const updated = req.body;
  products = products.map(p => p.id === id ? { ...p, ...updated } : p);
  res.json({ success: true, products });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
