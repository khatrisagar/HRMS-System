const conn = require('../config/dbConnect');
const util = require('util')
const query =  util.promisify(conn.query).bind(conn);


const getUserBasicinfo = async(id="")=>{

    if(id=="")
    {

        const data = await query(`SELECT * FROM basic_info `)
        return data;
    }
    else{

    const data = await query(`SELECT basic_info_id,first_name FROM basic_info where fk_emp_id = ${id};`)
    return data;
    }

}

const getUserProfilePhoto = async(fields="*",id="")=>{

    if(id=="")
    {
        data = await query(`SELECT ${fields.toString()}  FROM document;`)
        return data;
    }
    else{
        data = await query(`SELECT ${fields.toString()} FROM document where fk_emp_id=${id}`);
        return data;
    }


}


const getLeaveapplication = async (req,res)=>{
    try{
        const result = await query(`select * from leave_application where fk_emp_id = ${req.session.emp_id}`)

        var leavesObject = {
            sLeave: 0,
            cLeave: 0,
            pLeave: 0,
            upLeave: 0,
        }

        for(x of result){
            if(x.leave_type == 'SL'){
                leavesObject.sLeave+=1;
            }
            else if(x.leave_type == 'CL'){
                leavesObject.cLeave+=1;
            }
            else if(x.leave_type == 'PL'){
                leavesObject.pLeave+=1;
            }
            else if(x.leave_type == 'UPL'){
                leavesObject.upLeave+=1;
            }
        }
        const userInfo = await getUserBasicinfo(req.session.emp_id);
        const profilePhoto =  await getUserProfilePhoto(["profile_photo"],req.session.emp_id);
        res.render('leaveapplication',{"first_name": userInfo[0].first_name,"profilePhoto":profilePhoto[0].profile_photo,result,leavesObject});
    }
    catch(error){
        res.redirect('/dashbord/leave')
    }
}
const postLeaveapplication = async(req,res)=>{
    try{
        let result = await query(`insert into leave_application(fk_emp_id, leave_date,leave_reason,leave_type,is_halfday) values('${req.session.emp_id}','${req.body.leave_date}','${req.body.leave_reason}','${req.body.leave_type}','${req.body.is_half}')`)
        res.redirect('/dashbord/get-leave')

    }
    catch(error){
        res.redirect('/dashbord/leave')
    }
}


module.exports = {getLeaveapplication,postLeaveapplication}