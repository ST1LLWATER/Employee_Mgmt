const { Sequelize } = require('sequelize');
const Employee = require('../models/Employee');
const Metadata = require('../models/Metadata');
const sequelize = require('../config/database');

const createEmployee = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const body = req.body;

    // Create the employee in the database
    const employee = await Employee.create(body, { transaction });
    await Metadata.create(
      {
        employeeId: employee.id,
        ...body,
      },
      { transaction }
    );

    // Commit the transaction
    await transaction.commit();

    // Send a success response with the created employee

    res.status(201).json({ success: true, data: employee });
  } catch (error) {
    await transaction.rollback();
    // Handle duplicate email error
    if (error instanceof Sequelize.UniqueConstraintError) {
      return res
        .status(400)
        .json({ success: false, error: 'Email already exists' });
    }

    if (error instanceof Sequelize.ValidationError) {
      return res
        .status(400)
        .json({ success: false, error: error.errors[0].message });
    }

    // Handle any errors that occur during creation
    console.error('Error creating employee:', error);
    res
      .status(500)
      .json({ success: false, error: 'Failed to create employee' });
  }
};

const getEmployees = async (req, res) => {
  try {
    const { skip, lim } = req.query;

    // Get employees from the database
    const employees = await Employee.findAll({
      offset: skip ? parseInt(skip) : undefined,
      limit: lim ? parseInt(lim) : undefined,
    });

    res.status(200).json({ success: true, data: employees });
  } catch (error) {
    console.error('Error getting employees:', error);
    res.status(500).json({ success: false, error: 'Failed to get employees' });
  }
};

const getEmployeeById = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await Employee.findByPk(id, {
      include: { model: Metadata },
    });
    if (!employee) {
      return res
        .status(404)
        .json({ success: false, error: 'Employee not found' });
    }
    res.status(200).json({ success: true, data: employee });
  } catch (error) {
    console.error('Error getting employee by id:', error);
    res.status(500).json({ success: false, error: 'Failed to get employee' });
  }
};

const searchByName = async (req, res) => {
  const name = req.body.name;

  try {
    const results = await Employee.findAll({
      where: Sequelize.literal(
        `MATCH(first_name, last_name) AGAINST('${name}' IN BOOLEAN MODE)`
      ),
    });

    // `results` will contain the employees matching the search query
    res.status(200).json({ success: true, data: results });
  } catch (error) {
    console.error('Error searching employees:', error);
    res
      .status(500)
      .json({ success: false, error: 'Failed to search employees' });
  }
};

const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const employee = await Employee.findByPk(id);

    if (!employee) {
      return res
        .status(404)
        .json({ success: false, error: 'Employee not found' });
    }
    await Employee.update(body, {
      where: { id },
    });
    res.status(200).json({
      success: true,
      message: 'Employee updated successfully',
    });
  } catch (error) {
    console.error('Error updating employee:', error);
    res
      .status(500)
      .json({ success: false, error: 'Failed to update employee' });
  }
};

const updateEmployeeMetadata = async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const employee = await Employee.findByPk(id);

    if (!employee) {
      return res
        .status(404)
        .json({ success: false, error: 'Employee not found' });
    }
    await Metadata.update(body, {
      where: { employeeId: id },
    });
    res.status(200).json({
      success: true,
      message: 'Employee data updated successfully',
    });
  } catch (error) {
    console.error('Error updating employee:', error);
    res
      .status(500)
      .json({ success: false, error: 'Failed to update employee' });
  }
};

const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await Employee.findByPk(id);
    if (!employee) {
      return res
        .status(404)
        .json({ success: false, error: 'Employee not found' });
    }
    await employee.destroy();
    res.status(200).json({ success: true, message: 'Employee deleted' });
  } catch (error) {
    console.error('Error deleting employee:', error);
    res
      .status(500)
      .json({ success: false, error: 'Failed to delete employee' });
  }
};

module.exports = {
  createEmployee,
  getEmployees,
  getEmployeeById,
  searchByName,
  updateEmployee,
  deleteEmployee,
  updateEmployeeMetadata,
};
