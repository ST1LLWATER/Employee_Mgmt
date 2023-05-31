const express = require('express');
const {
  createEmployee,
  getEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
  updateEmployeeMetadata,
  searchByName,
} = require('../controllers/employee');
const router = express();

router.post('/employee/new', createEmployee);
router.get('/employee', getEmployees);
router.get('/employee/search', searchByName);
router.get('/employee/:id', getEmployeeById);
router.patch('/employee/:id', updateEmployee);
router.patch('/employee/metadata/:id', updateEmployeeMetadata);
router.delete('/employee/:id', deleteEmployee);

module.exports = router;
