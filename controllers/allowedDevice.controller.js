const conn = require('../config/dbConnect');
const util =  require('util');
const query =  util.promisify(conn.query).bind(conn)


const dashboardProfile = require('./dashboardprofile.controller')

const getAllowedDevices = async (req,res)=>{
    
    const userInfo = await dashboardProfile.getUserBasicinfo(req.session.emp_id)
    const profilePhoto =  await dashboardProfile.getUserProfilePhoto(["profile_photo"],req.session.emp_id);

    const allowedDeviceData = await query(`select ip_id, ip_address,ip_device_name from ip_info`)

    res.render('adminAllowedDevices',{allowedDeviceData,"first_name": userInfo[0].first_name,"profilePhoto":profilePhoto[0].profile_photo})
}

const postAllowedDevices =async (req,res)=>{
    console.log(req.body)
    const {ipAddress, deviceName} = req.body
    console.log(ipAddress,deviceName)
    const data = await query(`insert into ip_info(ip_address,ip_device_name)values("${ipAddress}","${deviceName}")`)
    res.end()
}
const deleteAllowedDevices =async (req,res)=>{
    const {ip_id} = req.body
    const data = await query(`delete from ip_info where ip_id = ${ip_id}`)
    res.end()
}

module.exports = {getAllowedDevices,postAllowedDevices,deleteAllowedDevices}