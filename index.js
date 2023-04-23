require('dotenv').config()
const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const session = require('express-session');
const conn = require('./config/dbConnect');
const util = require('util');
const query = util.promisify(conn.query).bind(conn);
const socketIo = require('socket.io');

const PORT = process.env.PORT


//require routes
const userRoutes = require('./routes/user.route');
const employeeForm = require('./routes/employee-form.route');
const dashbord = require('./routes/dashbord.route');
const admin = require('./routes/adminDashboard.route');
const {auth } = require('./middleware/auth');


//set up middlewares
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())
app.use(session({
    key: "sessionid",
    resave: false,
    saveUninitialized: true,
    secret: "red"
}));

app.locals.moment = require('moment');
app.use(express.static(__dirname + '/public'))
app.use(express.static(__dirname + ''));
app.set('view engine', 'ejs');

const pageNotFound = require('./controllers/404.controller')
    //define routes

app.use("/",userRoutes);
app.use("/employee/",auth,employeeForm);
app.use("/dashbord/",auth,dashbord);
app.use("/admin/",auth,admin);

app.use("/*", pageNotFound);

// HEADER-UI
// app.get("/dashboard", function(req,res){
//     res.render('dashboard.ejs')
// })

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}} `);

});
const io = socketIo(server)
io.on('connection',(socket) => {
    console.log("connect to socket");

    socket.on('chat',({emp_id,inputValue,userImage,userName,image})=>{
        console.log(inputValue)
        io.emit('chat',{emp_id,inputValue,userImage,userName,image})
    })
    

    socket.on('disconnect', function () {
        console.log('A user disconnected');
    })

})
