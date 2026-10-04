require('dotenv').config();
const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
const expressLayouts = require('express-ejs-layouts');
const connectDB = require('./config/db');
const planeRoutes = require('./routes/planeroutes');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(expressLayouts);
app.set('layout', 'main');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => res.redirect('/planes'));
app.use('/planes', planeRoutes);

app.use((req, res) => {
  res.status(404).render('error', { title: '404', message: 'ไม่พบหน้านี้' });
});

app.use((err, req, res, next) => {
  console.error(err);
  const message = err.name === 'CastError' ? 'รหัสเครื่องบินไม่ถูกต้อง' : 'เกิดข้อผิดพลาดบนเซิร์ฟเวอร์';
  res.status(500).render('error', { title: 'Error', message });
});

const PORT = process.env.PORT || 3000;

connectDB()
  .then(() => {
    app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
  })
  .catch((error) => {
    console.error('Failed to start app because MongoDB connection failed.');
    console.error(error.message);
    process.exit(1);
  });