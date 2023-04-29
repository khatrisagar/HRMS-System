const conn = require('../config/dbConnect');
const util = require('util');
const query = util.promisify(conn.query).bind(conn)
const bcrypt = require('bcryptjs');

const getLogin = (req, res) => {
    if (req.cookies.sessionid && req.session.emp_id) {
        res.redirect('/dashbord')
    }
    else {
        res.render('login')

    }
}


const redirectLogin = (req, res) => {

    res.redirect('/get-login')
}

const postLogin = async (req, res) => {

    try {
        let { user_email, user_password, user_IP } = req.body;

        const userIPData = await query(`select ip_address from ip_info where ip_address = "${user_IP}"`)

        // console.log(userIPData)

        if (userIPData.length === 0) {
            res.json({ ans: "err", message: "Your Device is Not Authorized by Admin" })
        }
        else {

            var sql = `select emp_id,email,isactivate,isdelete,password from hrms_employee where email = '${user_email}'`;
            var result = await query(sql)

            if (result.length == 0) {
                res.json({ ans: "err", message: "All the Fields Are Mandatory" })
            }
            else{
            const data = result[0].password;

            var match = await bcrypt.compare(user_password, data);

            if (match) {
                req.session.email = user_email;
                req.session.emp_id = result[0].emp_id;
                req.session.save();

                if (result[0].isactivate) {
                    const basicinfo = await query(`SELECT basic_info_id,first_name FROM hrms.basic_info where fk_emp_id = ${result[0].emp_id};`)
                    if (basicinfo.length == 0) {

                        res.json({ ans: "get-employee-data", message: "redirected" })
                        // res.redirect("/employee/get-employee-data");
                    }
                    else {
                        res.json({ ans: "dashboard", message: "redirected" })
                        // res.redirect('dashbord');
                    }
                }
                else {
                    res.json({ ans: "activate", message: "redirected" })
                    // res.redirect('/get-activate');
                }

            }
            else {
                res.json({ ans: "err", message: "Wrong Email or Password" })
                // return res.render("login", { "err": "Wrong email or password" })
            }
            }
        }

    }
    catch (error) {
        console.log(error)
        res.json({ ans: "login", message: "Something went wrong" })
        // throw new Error(error.message)
    }
}

const getLogout = (req, res) => {
    req.session.destroy()
    res.clearCookie("sessionid");
    res.redirect('get-login')
}

module.exports = { postLogin, getLogin, getLogout, redirectLogin };