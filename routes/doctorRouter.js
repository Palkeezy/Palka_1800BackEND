const router = require('express').Router();

const getDoctorByName = require('../controllers/doctor/getDoctorByName');
const createDoctor = require('../controllers/doctor/createDoctor');
const getDoctorById = require('../controllers/doctor/getDoctorById');

router.post('/', createDoctor);
router.get('/', getDoctorByName);
router.get('/:id', getDoctorById);

module.exports = router;