const express = require('express');
const {
  createEmployee,
  getEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
  updateEmployeeMetadata,
} = require('../controllers/employee');
const router = express();

router.post('/employee/new', createEmployee);
router.get('/employee/:id', getEmployeeById);
router.get('/employee', getEmployees);
router.patch('/employee/:id', updateEmployee);
router.patch('/employee/metadata/:id', updateEmployeeMetadata);
router.delete('/employee/:id', deleteEmployee);

module.exports = router;
