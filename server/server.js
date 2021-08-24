const dotenv = require('dotenv');
dotenv.config();
const PORT = process.env.PORT || 8080;

const chalk = require('chalk');
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended:true}))

//import route
const routeStudent = require('./route/studentRouting');
const routeCourse = require('./route/courseRouting');
const routeStaff = require('./route/staffRouting');
const routeForum = require('./route/forumRouting');
const {isToken} = require('./controller/authorization/isToken');
const routeLoginRegister = require('./route/loginRouting');
const classScheduleRouting = require('./route/classScheduleRouting')
const routeEvent = require('./route/eventsRouting')

//DB connection
const db = require('./DB');

//Connection to DB field
db.on('error', () => {
    console.log(chalk.red('Connection error'));
});


app.get('/api',isToken ,(req,res)=>{
    res.send("token page")
})


// use route
app.use('/api/student', routeStudent);
app.use('/api/course',routeCourse);
app.use('/api/staff',routeStaff);
app.use('/api/forum',routeForum);
app.use('/api/login',routeLoginRegister);
app.use('/api/staff/register',routeLoginRegister);
app.use('/api/event', routeEvent);
app.use('/api/classSchedule', classScheduleRouting);

app.listen(PORT, () => {
    console.log(
        `${chalk.green('tech_career')} ${chalk.yellow(
      'live and up on port'
    )} ${chalk.blue(PORT)}`
    );
});



