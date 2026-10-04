const express = require('express');
const router = express.Router();
const {
  index,
  newForm,
  create,
  show,
  editForm,
  update,
  destroy,
} = require('../controllers/planeController');

router.get('/', index);
router.get('/new', newForm);
router.post('/', create);
router.get('/:id', show);
router.get('/:id/edit', editForm);
router.put('/:id', update);
router.delete('/:id', destroy);

module.exports = router;