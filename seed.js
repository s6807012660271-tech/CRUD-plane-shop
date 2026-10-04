require('dotenv').config();
const mongoose = require('mongoose');
const Plane = require('./model/modelplane');

const data = [
  { name: 'Boeing 737 MAX 8', manufacturer: 'Boeing', category: 'Commercial', year: 2023, price: 121600000, seats: 178, rangeKm: 6570, stock: 3, description: 'Narrow-body airliner ประหยัดน้ำมันกว่ารุ่นเดิม 14%' },
  { name: 'Airbus A350-900', manufacturer: 'Airbus', category: 'Commercial', year: 2022, price: 317400000, seats: 325, rangeKm: 15000, stock: 2, description: 'Wide-body ลำตัวคอมโพสิต บินไกลข้ามทวีป' },
  { name: 'Gulfstream G650ER', manufacturer: 'Gulfstream', category: 'Private Jet', year: 2021, price: 72000000, seats: 19, rangeKm: 13890, condition: 'Used', stock: 1, description: 'Ultra-long-range business jet' },
  { name: 'Cessna 172 Skyhawk', manufacturer: 'Cessna', category: 'Trainer', year: 2020, price: 440000, seats: 4, rangeKm: 1270, stock: 8, description: 'เครื่องบินฝึกบินยอดนิยมที่สุดในโลก' },
];

(async () => {
  const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/planeStore';
  await mongoose.connect(mongoUri);
  await Plane.deleteMany();
  await Plane.insertMany(data);
  console.log('🌱 Seeded!');
  process.exit();
})();