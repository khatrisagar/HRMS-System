const conn = require('../config/dbConnect');
const util =  require('util');
const query =  util.promisify(conn.query).bind(conn)


const dashboardProfile = require('./dashboardprofile.controller')

const getAllowedDevices = async (req,res)=>{
    
    const userInfo = await dashboardProfile.getUserBasicinfo(req.session.emp_id)
    const profilePhoto =  await dashboardProfile.getUserProfilePhoto(["profile_photo"],req.session.emp_id);

    res.render('AdminAllowedDevices',{"first_name": userInfo[0].first_name,"profilePhoto":profilePhoto[0].profile_photo})
}

const postAllowedDevices =async (req,res)=>{
    console.log(req.body)
    const {ipAddress, deviceName} = req.body
    console.log(ipAddress,deviceName)
    const data = await query(`insert into ip_info(ip_address,ip_device_name)values("${ipAddress}","${deviceName}")`)
    res.end()
}

module.exports = {getAllowedDevices,postAllowedDevices}