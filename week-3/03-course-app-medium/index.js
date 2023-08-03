const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const fs = require('fs')
app.use(express.json());
app.use(bodyParser.json());

let ADMINS = [];
let USERS = [];
let COURSES = [];

try{
  ADMINS = JSON.parse(fs.readFileSync('ADMINS.json'));
  USERS = JSON.parse(fs.readFileSync("USERS.json"));
  COURSES = JSON.parse(fs.readFileSync("COURSES.json"));

}catch{
  ADMINS = [];
  USERS = [];
  COURSES = [];
}

function writeToFile(path, data){
  fs.writeFile(path, JSON.stringify(data), (err)=>{
    if(err){
      console.error(err);
    }
    console.log("File successfully admitted");
  });
}

function appendToFile(path, data){
  // fs.appendFile(path, JSON.stringify(data), (err)=>{
  //   if(err){
  //     console.error(err);
  //   }
  //   console.log("File successfully updated");
  // })

  fs.readFile(path, 'utf8', (err, data)=>{
    if(err){
      console.log(err);
    }else{
    }
  });
}
const secretKey = "S3cr3t"

const generateJwt = (user) =>{
  const payload = {username: user.username};
  return jwt.sign(payload, secretKey, {expiresIn: '1h'});
}


const adminAuthenticaJwt = (req, res, next) => {
 const authHeader = req.headers.authorization;
  if(authHeader){
    const token = authHeader.split(' ')[1];
    jwt.verify(token, secretKey, (err, user)=>{
      if(err){
        console.error(err);
      }
      //console.log(user);
      req.user = user;
      next();
      });
  }else{
    res.status(401).json("Authentication failed");
  }
}

const userAuthenticationJwt = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if(!authHeader){
    res.status(403).json({message: "Authentication failed"});
  }else{
    const token = authHeader.split(' ')[1];
    jwt.verify(token, secretKey, (err, user)=>{
      if(err){
        console.error(err);
      }else{
        //console.log(user);
        req.user = user;
        console.log("Authenticated User:", req.user);
        next();
      }
    });
  }
}

// Admin routes
app.post('/admin/signup', (req, res) => {
  // logic to sign up admin
  const admin = req.body;
  console.log(ADMINS);
  const adminAlreadyExist = ADMINS.find(a=> a.username == admin.username)
  if(!adminAlreadyExist){
    ADMINS.push(admin);
    writeToFile('ADMINS.json', ADMINS);
    const token = generateJwt(admin);
    res.json({message: 'Admin created successfully', authToken: token}).send();
  }else{
    res.status(401).json({message: 'Admin already exits'});
  }
});

app.post('/admin/login', (req, res) => {
  // logic to log in admin
  const {username, password} = req.headers;
  const admin = ADMINS.find(a=>a.username == username && a.password == password);
  if(!admin){
    res.status(401).json({message: "Admin Authentication failed"});
  }else{
    const token = generateJwt(admin);
    res.json({message:"Logged in successfully", authToken: token});
  }
});

app.post('/admin/courses', adminAuthenticaJwt, (req, res) => {
  // logic to create a course
  const course = req.body;
  course.id = Date.now();
  COURSES.push(course);
  writeToFile('COURSES.json',COURSES);
  res.json({
    message:"Course created successfully", 
    courseID:course.id
  });
});

app.put('/admin/courses/:courseId', adminAuthenticaJwt, (req, res) => {
  // logic to edit a course
  const courseId = req.params.courseId;
  const courseIndex = COURSES.findIndex(c=> c.id == courseId);
  if(courseIndex > -1){
    const updatedCourse = {...COURSES[courseIndex], ...req.body};
    COURSES[courseIndex] = updatedCourse;
    writeToFile('COURSES.json', COURSES);
    res.json({message: "Course Updated Successfully"}).send();
  }else{
    res.status(404).json("Course not found");
  }
});

app.get('/admin/courses', adminAuthenticaJwt, (req, res) => {
  // logic to get all courses
  res.json({courses: COURSES}).send();
});

// User routes
app.post('/users/signup', (req, res) => {
  // logic to sign up user
  const user = req.body;
  const userAreadyExist = USERS.find(u=> u.username == user.username);
  if(!userAreadyExist){
    USERS.push(user);
    writeToFile('USERS.json', USERS);
    const token = generateJwt(user);
    res.json({message: "User created Successfully", authToken: token}).send();
  }else{
    res.status(401).json({message: "User already exists"});
  }
});

app.post('/users/login', (req, res) => {
  // logic to log in user
  const {username, password} = req.headers;
  const user = USERS.find(u=> u.username == username && u.password == password);
  if(!user){
    res.status(403).json({message:"User authenticaation failed"});
  }else{
    const token = generateJwt(user);
    res.json({message:"Successfully logged in", authToken: token});
  }
});

app.get('/users/courses', userAuthenticationJwt, (req, res) => {
  // logic to list all courses
  res.json({courses: COURSES}).send();

});

app.post('/users/courses/:courseId', (req, res) => {
  // logic to purchase a course
  const courseId = req.params.courseId;
  const course = COURSES.find(c=>c.id === parseInt(courseId));
  if(!course){
    res.status(404).json({message: "Course not found"});
    }else{
    //console.log(user.username);
    console.log(USERS);
    const user = USERS.find(u=>u.username === req.headers.username);
    if(!user){
    res.status(403).json({message: "User not found"});
    }else{
      if(!user.purchasedCourse){
        user.purchasedCourses = [];
      }
      user.purchasedCourses.push(course);
      writeToFile('USERS.json', USERS);
      res.json({message:"Course purchased Successfully"}).send();
    }
  }
});

app.get('/users/purchasedCourses', (req, res) => {
  // logic to view purchased courses
   const user = USERS.find(u=>u.username === req.headers.username);
   console.log(user)
   if(user && user.purchasedCourses){
    res.json({purchasedCourse: user.purchasedCourses}).send();
   }else{
    res.json({message: "No purchased courses"}).send();
   }
});

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
