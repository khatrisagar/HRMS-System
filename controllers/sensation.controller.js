const conn = require('../config/dbConnect');
const util = require('util')
const query = util.promisify(conn.query).bind(conn);
const multer = require('multer');



var storage = multer.diskStorage({
    destination: function(req, file, cb) {
       
        cb(null, `./uploads/sensationPhoto/`);
    },
    filename: function(req, file, cb, ) {

        cb(null, file.originalname.split(".")[0] + Date.now() + ".jpg");
    }
});

const upload = multer({ storage: storage }).single('file');


const getUserBasicinfo = async (id = "") => {

    if (id == "") {

        const data = await query(`SELECT * FROM hrms.basic_info `)
        return data;
    } else {

        const data = await query(`SELECT basic_info_id,first_name FROM hrms.basic_info where fk_emp_id = ${id};`)
        return data;
    }

}

const getUserProfilePhoto = async (fields = "*", id = "") => {

    if (id == "") {
        data = await query(`SELECT ${fields.toString()}  FROM hrms.document;`)
        return data;
    } else {
        data = await query(`SELECT ${fields.toString()} FROM hrms.document where fk_emp_id=${id}`);
        return data;
    }


}
const getSensation = async (req, res) => {
    const data= await query(`select sensation.fk_emp_id,sensation.comment_id,sensation.image,basic_info.first_name,sensation.sensation_comment,document.profile_photo from sensation 
    inner join basic_info on sensation.fk_emp_id=basic_info.fk_emp_id 
    inner join document on sensation.fk_emp_id=document.fk_emp_id order by created_time; ` );
    const userInfo = await getUserBasicinfo(req.session.emp_id);
    const profilePhoto = await getUserProfilePhoto(["profile_photo"], req.session.emp_id);
   
    res.render('sensation', {data,"first_name": userInfo[0].first_name, "profilePhoto": profilePhoto[0].profile_photo, "emp_id":req.session.emp_id });
}

const postSensation = async(req, res) => {
    try {

        
        upload(req, res, async function(err) {
           

            if (err instanceof multer.MulterError) {
                console.log(err)
            } else if (err) {
                console.log(err)
            }
            var inputValue = req.body.inputValue;
           
            if(req.file)
           {
                if(inputValue)
                {
                     query(`insert into sensation (fk_emp_id,sensation_comment,image) values ('${req.session.emp_id}','${inputValue}','${req.file.path}')`)
                }   
                else{
                    query(`insert into sensation (fk_emp_id,image) values ('${req.session.emp_id}','${req.file.path}')`)
                }  

                res.json({"image":req.file.path})
           }
           else{

      
                 query(`insert into sensation (fk_emp_id,sensation_comment) values ('${req.session.emp_id}','${inputValue}')`)
           }

          
          

        })

        
        
    


    }
    catch {
        res.redirect('/dashbord')
    }
}

module.exports = { getSensation, postSensation }