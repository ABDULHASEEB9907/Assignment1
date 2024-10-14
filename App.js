const express = require('express');
const axios = require('axios');



const app = express();
const PORT = 5200;

app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static('public'));


app.get('/', (req, res) => {
  res.render('index');
});



app.get('/products', async (req, res) => {
  try {
    const response = await axios.get('https://fakestoreapi.com/products');
    const products = response.data;
    res.render('product', { products });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).send('Error fetching products');
  }
});



app.get('/form', (req, res) => {
  res.render('form');
});

app.post('/submit', (req, res) => {
  const { name, email } = req.body;
  res.send(`Form submitted! Name: ${name}, Email: ${email}`);
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
