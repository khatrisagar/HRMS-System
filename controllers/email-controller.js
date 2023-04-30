const nodemailer = require("nodemailer");
let email1;
const conn = require('../config/dbConnect');
const util = require('util');
const query = util.promisify(conn.query).bind(conn)

let OTP;
const postCode = async(req, res) => {
    OTP = Math.floor(Math.random() * 10000);

    email1 = req.body.email;
 


    let query1 = `update hrms_employee set code="${OTP}" where email="${email1}" `;
    var updateData = await query(query1);
    sendMail(email1);
    res.json({ OTP });

    OTP = "";

}





const sendMail = async(email1) => {

    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        },
    })
    let mailInfo = {
        from: `"HRMS" <process.env.email>`,
        to: email1,
        subject: 'Welcome to HRMS',
        html: `<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
        <div style="margin:50px auto;width:70%;padding:20px 0">
        <div style="border-bottom:1px solid
        #EEE
        ">
        <a href="" style="font-size:1.4em;color:
        #00466A
        ;text-decoration:none;font-weight:600">eSparkbiz</a>
        </div>
        <p style="font-size:1.1em">Hi,</p>
        <p>Thank you for choosing eSparkbiz. Use the following OTP to complete your Sign Up procedures. OTP is valid for 5 minutes</p>
        <h2 style="background:
        #00466A
        ;margin: 0 auto;width: max-content;padding: 0 10px;color:
        #FFF
        ;border-radius: 4px;">${OTP}</h2>
        <p style="font-size:0.9em;">Regards,<br />EsparkBiz</p>
        <hr style="border:none;border-top:1px solid
        #EEE
        " />
        </div>
        </div>`



    }


    transporter.sendMail(mailInfo, function(error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent successfully');
        }
    })
}


module.exports = { postCode };