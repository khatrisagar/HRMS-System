const conn = require('../config/dbConnect');
const util =  require('util');
const query =  util.promisify(conn.query).bind(conn)

// impoted controlllers
const dashboardProfile = require('./dashboardprofile.controller')

const adminDashboardRedirecting =  async (req,res) =>{
    res.redirect('/admin/dashboard/employee')
}




const adminDashboard = async (req,res)=>{

    const userInfo = await dashboardProfile.getUserBasicinfo(req.session.emp_id)
    const profilePhoto =  await dashboardProfile.getUserProfilePhoto(["profile_photo"],req.session.emp_id);

    res.render('adminDashboard', {"first_name": userInfo[0].first_name,"profilePhoto":profilePhoto[0].profile_photo})

}





module.exports = {adminDashboard,adminDashboardRedirecting}