const express = require('express');
const router = express.Router();
const controller = require('../controllers/role_controller')

router.get('/getList', controller.get_list);
router.get('/get', controller.get);
router.post('/create', controller.create);
router.put('/edit', controller.edit);

module.exports = router;