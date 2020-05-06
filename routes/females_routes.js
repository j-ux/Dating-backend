const express = require('express')
const router = express.Router()

const { check } = require('express-validator')

const femalesController = require('../controllers/females_controller')

router.get('/',femalesController.index)
router.get('/:female_id', femalesController.show)
router.post('/',[check('name').not().isEmpty(), check('email').isEmail(), check('phone').not().isEmpty(),check('hobbies').not().isEmpty(),check('employment_status').not().isEmpty(),check('marital_status').not().isEmpty(),check('age').not().isEmpty()],femalesController.store)
router.patch('/:female_id',femalesController.update)
router.delete('/:female_id',femalesController.deleteFemale)

module.exports = router