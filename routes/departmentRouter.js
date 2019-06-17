const router = require('express').Router();

const getAllDepartments = require('../controllers/department/gelAllDepartments');
const createDepartment = require('../controllers/department/createDepartment');
const getDepartmentById = require('../controllers/department/getDepartmentById');


router.post('/', createDepartment);
router.get('/', getAllDepartments);
router.get('/:id', getDepartmentById);


module.exports = router;

