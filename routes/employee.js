const express = require('express');
const {
  createEmployee,
  getEmployees,
  getEmployeeById,
} = require('../controllers/employee');
const router = express();

router.post('/employee/new', createEmployee);
router.get('/employee/:id', getEmployeeById);
router.get('/employee', getEmployees);

module.exports = router;
