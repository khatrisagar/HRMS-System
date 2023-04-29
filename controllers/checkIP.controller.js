const conn = require('../config/dbConnect');
const util = require('util')
const query = util.promisify(conn.query).bind(conn);

const verifyUserIP =async (req,res)=>{
   try{
    const userIPData =await query(`select ip_address from ip_info where ip_address = "${req.query.userIP}"`)

    if(userIPData.length === 0){
        res.json({validIP:false})
    }
    else{
        res.json({validIP:true})
    }
   }
   catch(err){
    console.log(err)
   }
}

module.exports = {verifyUserIP};