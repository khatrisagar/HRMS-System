const conn = require('../config/dbConnect');
const util =  require('util');
const query =  util.promisify(conn.query).bind(conn)

const roleAuth = async (req,res,next)=>{
   try{
    if(req.session.emp_id){
        const roleStatus =  await query(`select is_admin from hrms_employee where emp_id = ${req.session.emp_id}`)
        // console.log("rolestatus",roleStatus)
        if(roleStatus[0].is_admin == 1){
            next()
        }
        else{
            res.redirect('/dashbord')
        }
    }
   }    
   catch(err){
    res.json({err: err.message})
   }
}


module.exports = roleAuth