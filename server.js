require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const app = express();

app.use(express.json());

// Connexion à MongoDB
connectDB();

// Routes
const productRoutes = require('./routes/products');
const userRoutes = require('./routes/users');
const orderRoutes = require('./routes/orders');
const reviewRoutes = require('./routes/reviews');
const logRoutes = require('./routes/logs');
const authRoutes = require('./routes/auth');
const accessDemoRoutes = require('./routes/productAccessDemo');

app.use('/products', productRoutes);
app.use('/users', userRoutes);
app.use('/orders', orderRoutes);
app.use('/reviews', reviewRoutes);
app.use('/logs', logRoutes);
app.use('/auth', authRoutes);
app.use('/demo', accessDemoRoutes);

// Route de test
app.get('/', (req, res) => {
  res.send('API en marche !');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Serveur démarré sur le port ${PORT}`));