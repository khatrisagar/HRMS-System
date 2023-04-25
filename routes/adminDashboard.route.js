const express = require('express');
const router = express.Router();

// controllers
const adminDashboardcontroller = require('../controllers/adminDashboard.controller') 
const leaveApprove = require('../controllers/leave-approve.controller')
const adminComments = require('../controllers/adminComments.controller')
const adminEmployeeData = require('../controllers/adminEmployeeData.contoller')



router.get('/', adminDashboardcontroller.adminDashboardRedirecting)
router.get('/dashboard', adminDashboardcontroller.adminDashboard)

router.get('/dashboard/approveleave', leaveApprove.getApproveLeave)
router.post('/post-approveleave', leaveApprove.postApproveLeave)
router.get('/dashboard/comments', adminComments.getCommentData)
router.get('/dashboard/commentId', adminComments.getCommentId);
router.get('/dashboard/employee', adminEmployeeData.employeesData);
router.get('/dashboard/employee/:id', adminEmployeeData.singleEmployeeData);


module.exports = router