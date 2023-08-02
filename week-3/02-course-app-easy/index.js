const express = require('express');
const app = express();
var bodyParser = require('body-parser');
app.use(express.json());
app.use(bodyParser.json());

let ADMINS = [];
let USERS = [];
let COURSES = [];
//let purchasedCourse = [];

const adminAuthentication = (req, res, next) => {
  const adminCred = ADMINS.find(ad => ad.username === req.headers.username && ad.password === req.headers.password);
  if(!adminCred){
    res.status(403).json({message: "Admin authentication failed"}).send()
  }else{
    next();
  }
}

const userAuthentication = (req, res, next) => {
  const userCred = USERS.find(ad => ad.username === req.headers.username && ad.password === req.headers.password);
  if(!userCred){
    res.status(403).json({message: "User authentication failed"}).send()
  }else{
    userCred.purchasedCourseId= [];
    req.user = userCred;
    next();
  }
}
// Admin routes
app.post('/admin/signup', (req, res) => {
  // logic to sign up admin
  
  const adminCred = {
    username: req.body.username,
    password: req.body.password
  }
  ADMINS.push(adminCred);
  //console.log(ADMINS);
  res.json({messge:"Admin created successfully"});
});

app.post('/admin/login', adminAuthentication, (req, res) => {
  // logic to log in admin
  
  res.json({message:"Logged in Successfully"});
  console.log(cred);
});

app.post('/admin/courses', adminAuthentication, (req, res) => {
  // logic to create a course
  
  const course = req.body;
  course.id = Date.now();
  COURSES.push(course);
  //console.log("Course Successfully pushed: "+courseDet);
  //console.log(COURSES);
  res.json({
    message:"Course created successfully", 
    courseID:course.id
  });
});

app.put('/admin/courses/:courseId', adminAuthentication, (req, res) => {
  // logic to edit a course
  
  var courseId = parseInt(req.params.courseId);
  let course = COURSES.find(c=> c.id === courseId);
  if(!course){
    res.status(404).json({message:"Course not found"});
  }else{
    Object.assign(course, req.body);
    res.json(COURSES).send()
  }
});

app.get('/admin/courses', adminAuthentication, (req, res) => {
  // logic to get all courses
    res.json({courses: COURSES}).send();
});

// User routes

app.post('/users/signup', (req, res) => {
  // logic to sign up user
  const user = {
    username: req.headers.username,
    password: req.headers.password
  };
  USERS.push(user);
  console.log("User created successfully");
  //console.log(USERS);
  res.json({message: "User created successfully"}).send();

});

app.post('/users/login', userAuthentication, (req, res) => {
  // logic to log in user
  res.json({message:"Logged in successfully"}).send();
});

app.get('/users/courses', userAuthentication, (req, res) => {
  // logic to list all courses
  let filteredCourses = COURSES.filter(c => c.published)
  res.json({courses: filteredCourses}).send();
  //console.log(COURSES);
});

app.post('/users/courses/:courseId', userAuthentication, (req, res) => {
  // logic to purchase a course
  
  var courseID = parseInt(req.params.courseId)
  let course = COURSES.find(t=> t.id === courseID && t.published);
  if(!course){
    res.json("Course does not exist").send();
  }else{
    //console.log(req.user);  working
    //console.log(course);  working
    //console.log(req.user.purchasedCourseId)
    req.user.purchasedCourseId.push(courseID);
    console.log("purchased Courses:");
    console.log(req.user.purchasedCourseId)
    res.json({message: 'Course purchased successfully'}).send();
  }
});

app.get('/users/purchasedCourses', userAuthentication, (req, res) => {
  // logic to view purchased courses
  
  var purchasedCourse = []
  var purchasedCourseIds = req.user.purchasedCourseId;
  for(i=0; i<COURSES.length; i++){
    if(purchasedCourseIds.indexOf(COURSES[i].id) !== -1){
      purchasedCourse.push(COURSES[i]);
    }
  }

  res.json({courses: purchasedCourses}).send();
});

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
