const conn = require('../config/dbConnect');
const util =  require('util');
const query =  util.promisify(conn.query).bind(conn)

const roleAuth = async (req,res,next)=>{
   try{
    if(req.session.emp_id){
        const roleStatus =  await query(`select isAdmin from hrms_employee where emp_id = ${req.session.emp_id}`)
        if(roleStatus == 1){
            next()
        }
        else{
            res.redirect('/dashboard')
        }
    }
   }    
   catch(err){
    res.json({err: err.message})
   }
}