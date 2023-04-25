const conn = require('../config/dbConnect');
const util = require('util');
const query = util.promisify(conn.query).bind(conn);

const dashboardProfile = require('./dashboardprofile.controller')


const employeesData =  async(req,res) =>{

    const userInfo = await dashboardProfile.getUserBasicinfo(req.session.emp_id)
    const profilePhoto =  await dashboardProfile.getUserProfilePhoto(["profile_photo"],req.session.emp_id);


    let employees = await query(`select fk_emp_id,first_name,last_name,city,email,phone_number from basic_info join hrms_employee on basic_info.fk_emp_id = hrms_employee.emp_id`)
    res.render('adminEmployees',{employees, "first_name": userInfo[0].first_name,"profilePhoto":profilePhoto[0].profile_photo})

}
const singleEmployeeData =  async(req,res) =>{
    
    const userInfo = await dashboardProfile.getUserBasicinfo(req.session.emp_id)
    const profilePhoto =  await dashboardProfile.getUserProfilePhoto(["profile_photo"],req.session.emp_id);
    
    const employeeId = req.params.id

    const data = await query(`select * from basic_info join document on basic_info.fk_emp_id = document.fk_emp_id where basic_info.fk_emp_id = "${employeeId}" 
    `)
    console.log("Single emp data",employeeId, data)
    res.render('adminSingleEmployeedata',{data,"first_name": userInfo[0].first_name,"profilePhoto":profilePhoto[0].profile_photo})

}
module.exports = {employeesData,singleEmployeeData}
