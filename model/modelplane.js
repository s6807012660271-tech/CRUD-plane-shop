const mongoose = require('mongoose');

const planeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'กรุณากรอกชื่อรุ่นเครื่องบิน'],
      trim: true,
      maxlength: [100, 'ชื่อต้องไม่เกิน 100 ตัวอักษร'],
    },
    manufacturer: {
      type: String,
      required: [true, 'กรุณาเลือกผู้ผลิต'],
      enum: ['Boeing', 'Airbus', 'Cessna', 'Embraer', 'Bombardier', 'Gulfstream', 'ATR', 'Lockheed Martin', 'SAAB','Kramenka Industries', 'Other'],
    },
    category: {
      type: String,
      required: true,
      enum: ['Commercial', 'Private Jet', 'Cargo', 'Trainer', 'Helicopter', 'Fighter Jet', 'Military'],
      default: 'Commercial',
    },
    year: {
      type: Number,
      required: true,
      min: [1950, 'ปีผลิตต้องไม่ต่ำกว่า 1950'],
      max: [new Date().getFullYear() + 2, 'ปีผลิตไม่ถูกต้อง'],
    },
    price: {
      type: Number,
      required: [true, 'กรุณากรอกราคา'],
      min: [0, 'ราคาต้องไม่ติดลบ'],
    },
    seats: { type: Number, default: 0, min: 0 },
    rangeKm: { type: Number, default: 0, min: 0 },
    condition: { type: String, enum: ['New', 'Used'], default: 'New' },
    stock: { type: Number, default: 1, min: 0 },
    imageUrl: { type: String, default: '' },
    description: { type: String, trim: true, maxlength: 1000 },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

planeSchema.virtual('priceFormatted').get(function () {
  return this.price.toLocaleString('th-TH', { style: 'currency', currency: 'THB' });
});

planeSchema.virtual('inStock').get(function () {
  return this.stock > 0;
});

module.exports = mongoose.model('Plane', planeSchema);