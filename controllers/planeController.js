const Plane = require('../model/modelplane');

const asyncHandler = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

exports.index = asyncHandler(async (req, res) => {
  const { q = '', manufacturer = '', category = '', sort = '-createdAt', page = 1 } = req.query;
  const limit = 9;
  const filter = {};

  if (q) filter.name = { $regex: q, $options: 'i' };
  if (manufacturer) filter.manufacturer = manufacturer;
  if (category) filter.category = category;

  const [planes, total] = await Promise.all([
    Plane.find(filter).sort(sort).skip((Number(page) - 1) * limit).limit(limit),
    Plane.countDocuments(filter),
  ]);

  res.render('index', {
    title: 'Aircraft Catalog',
    planes,
    query: { q, manufacturer, category, sort },
    currentPage: Number(page),
    totalPages: Math.ceil(total / limit) || 1,
    total,
  });
});

exports.newForm = (req, res) => {
  res.render('form', {
    title: 'Add New Plane',
    plane: new Plane(),
    action: '/planes',
    method: 'POST',
    errors: [],
  });
};

exports.create = asyncHandler(async (req, res) => {
  try {
    await Plane.create(req.body);
    res.redirect('/planes');
  } catch (err) {
    if (err.name !== 'ValidationError') throw err;
    res.status(400).render('form', {
      title: 'Add New Plane',
      plane: req.body,
      action: '/planes',
      method: 'POST',
      errors: Object.values(err.errors).map((e) => e.message),
    });
  }
});

exports.show = asyncHandler(async (req, res) => {
  const plane = await Plane.findById(req.params.id);

  if (!plane) {
    return res.status(404).render('error', { title: '404', message: 'ไม่พบเครื่องบินลำนี้' });
  }

  res.render('show', { title: plane.name, plane });
});

exports.editForm = asyncHandler(async (req, res) => {
  const plane = await Plane.findById(req.params.id);

  if (!plane) {
    return res.status(404).render('error', { title: '404', message: 'ไม่พบเครื่องบินลำนี้' });
  }

  res.render('form', {
    title: `Edit — ${plane.name}`,
    plane,
    action: `/planes/${plane._id}?_method=PUT`,
    method: 'POST',
    errors: [],
  });
});

exports.update = asyncHandler(async (req, res) => {
  try {
    const plane = await Plane.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!plane) {
      return res.status(404).render('error', { title: '404', message: 'ไม่พบเครื่องบินลำนี้' });
    }

    res.redirect(`/planes/${plane._id}`);
  } catch (err) {
    if (err.name !== 'ValidationError') throw err;

    res.status(400).render('form', {
      title: 'Edit Plane',
      plane: { ...req.body, _id: req.params.id },
      action: `/planes/${req.params.id}?_method=PUT`,
      method: 'POST',
      errors: Object.values(err.errors).map((e) => e.message),
    });
  }
});

exports.destroy = asyncHandler(async (req, res) => {
  await Plane.findByIdAndDelete(req.params.id);
  res.redirect('/planes');
});
