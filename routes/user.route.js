const express = require('express');
const router = express.Router();

const loginController = require('../controllers/login.controller');
const forgetController = require('../controllers/forget.controller');
const registrationController = require('../controllers/registration.controller')
const activationController = require('../controllers/activation.controller');
const attendance_summary = require("../controllers/attendance.summary.controller")
const employeeController = require('../controllers/employee-data.controller');
const userEmail = require('../controllers/get-all-user-email.controller');
const checkin = require("../controllers/checkin.controler");
const employeedataController = require('../controllers/employee-data.controller');
const emailcontroller = require('../controllers/email-controller');
const { auth } = require('../middleware/auth')
const checkIPController = require('../controllers/checkIP.controller');

router.get('/attendance_summary', attendance_summary.attendancy_summary)

router.get('/', loginController.redirectLogin);

router.get('/get-login', loginController.getLogin);
router.post('/post-login', loginController.postLogin);
router.get('/get-registration', registrationController.getRegistration);
router.post('/post-registration', registrationController.postRegistration);
router.get('/get-activate', activationController.getActivate);
router.post('/post-activate', activationController.postActivate);
router.get('/get-logout', loginController.getLogout);
router.get('/validateIP', checkIPController.verifyUserIP);
//router.get('/employee-data',employeeController);

router.get('/forget-password', forgetController.forgetPassword);
router.get('/all-email', forgetController.checkEmail);
router.post('/reset-password', forgetController.postEmail);
router.post('/getcode', emailcontroller.postCode);
router.get('/verifyOtp', forgetController.updatePassword);

router.get('/get-allUsersEmail', userEmail.getAllUsersEmail);

router.get('/get-allUsersEmail', userEmail.getAllUsersEmail);
router.post('/checkin', checkin.get_checkin);
router.post('/brakein', checkin.get_brakein);
router.post('/brakeout', checkin.get_brakeout);
router.post('/checkout', checkin.get_checkout);

router.get('/get-employee-basicinfo', employeedataController.getEmployeeBasicInfo);
router.get('/get-employee-edit', employeedataController.getEmployeeEdit);
router.post('/post-employee-edit', employeedataController.postEmployeeEdit);
router.post('/post-remove-photo', employeedataController.removePhoto);
router.post('/post-add-photo', employeedataController.addPhoto);



module.exports = router;