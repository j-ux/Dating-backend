const express = require('express')
const router = express.Router()

const { check } = require('express-validator')

const malesController = require('../controllers/males_controller')

router.get('/',malesController.index)
router.get('/:males_id', malesController.show)
router.post('/',[check('name').not().isEmpty(), check('email').isEmail(), check('phone').not().isEmpty(),check('hobbies').not().isEmpty(),check('employment_status').not().isEmpty(),check('marital_status').not().isEmpty(),check('age').not().isEmpty()],malesController.store)
router.patch('/:male_id',malesController.update)
router.delete('/:male_id',malesController.deleteMale)

module.exports = router