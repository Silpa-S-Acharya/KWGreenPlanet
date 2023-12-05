

// set paths for each requests

const express=require('express')

const upload = require('../multer/StorageConfig')
const { employeeRegister, getAllEmployees,getEmployee,removeEmployee,editEmployee } = require('../controllers/logic')


// create an object for Router class in express
const router=new express.Router()

// register employee - post
router.post('/employees/register',upload.single('user_profile'),employeeRegister)

// get all employees
router.get('/employees/getEmployees',getAllEmployees)

// get single employee details
router.get('/employees/getEmployee/:id',getEmployee)

// delete employee
router.delete('/employees/removeEmployee/:id',removeEmployee)

// edit employee
router.put('/employees/updateEmployee/:id',upload.single('user_profile'),editEmployee)

module.exports=router