const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const fs = require("fs");
const mongoose = require('mongoose');

app.use(express.json());
app.use(bodyParser.json());

// mongoose Schema
const adminSchema = new mongoose.Schema({
  username: String,
  password: String
});
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  purchasedCourses: [{type: mongoose.Schema.Types.ObjectId, ref: 'Course'}]
});
const courseSchema = new mongoose.Schema({
  title: String,
  description: {type: String},
  price: Number,
  imageLink: {type: String},
  published:Boolean
});

// mongoose models
let Admin = mongoose.model('Admin', adminSchema);
let User = mongoose.model('User', userSchema);
let Course = mongoose.model('Course', courseSchema);

// Connect to mongoose
mongoose.connect('mongodb+srv://shyanroy:Geforce1050@cluster0.pp8temp.mongodb.net/course-selling-app', {dbName: "course-selling-app"})

const secretKey = "S3cr3t";

const generateJwt = (user, role) => {
  console.log(user)
  //console.log(user.username)
  // if (!user || !user.username || !role) {
  //   throw new Error("Invalid user or role provided");
  // }
  
  const payload = { username: user.username, role: role};
  return jwt.sign(payload, secretKey, { expiresIn: "1h" });
};

const adminAuthenticaJwt = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, secretKey, (err, user) => {
      if (err) {
        console.error(err);
      }
      //console.log(user);
      req.user = user;
      next();
    });
  } else {
    res.status(401).json("Authentication failed");
  }
};

const userAuthenticationJwt = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    res.status(403).json({ message: "Authentication failed" });
  } else {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, secretKey, (err, user) => {
      if (err) {
        console.error(err);
      } else {
        //console.log(user);
        req.user = user;
        console.log("Authenticated User:", req.user);
        next();
      }
    });
  }
};

// Admin routes
app.post("/admin/signup", async (req, res) => {
  // logic to sign up admin
  const {username, password} = req.body;
  const admin = await Admin.findOne({username});
  if (!admin) {
    const newAdmin = new Admin({username, password});
    await newAdmin.save();
    const token = generateJwt(admin, 'admin');
    res.json({ message: "Admin created successfully", authToken: token }).send();
  } else {
    res.status(401).json({ message: "Admin already exits" });
  }
});

app.post("/admin/login", async (req, res) => {
  // logic to log in admin
  const { username, password } = req.headers;
  const admin = await Admin.findOne({username, password})
  if (!admin) {
    res.status(401).json({ message: "Invalid username or password" });
  } else {
    const token = generateJwt(admin, 'admin');
    res.json({ message: "Logged in successfully", authToken: token });
  }
});

app.post("/admin/courses", adminAuthenticaJwt, async (req, res) => {
  // logic to create a course
  const {username, password} = req.headers;
  const admin = await Admin.findOne({username, password})
  if(!admin){
    res.status(403).json({message: "Invalid username or password"});
  }else{
    const course = new Course(req.body);
    course.id = Date.now();
    await course.save();
    res.json({message: "Course created successfully", courseID: course.id});
  }
});

app.put("/admin/courses/:courseId", adminAuthenticaJwt, async (req, res) => {
  // logic to edit a course
  const courseId = req.params.courseId;
  const course = await Course.findOneAndUpdate(courseId, req.body, {new: true})
  if (course) {
    res.json({ message: "Course Updated Successfully" }).send();
  } else {
    res.status(404).json("Course not found");
  }
});

app.get("/admin/courses", adminAuthenticaJwt, async(req, res) => {
  // logic to get all courses
  const course = await Course.find({});
  res.json({ courses: course }).send();
});

// User routes
app.post("/users/signup", async (req, res) => {
  // logic to sign up user
  const {username, password} = req.body;
  const user = await User.findOne({username, password});
  if (!user) {
    user = new User({ username, password });
    await user.save();
    const token = generateJwt(user, 'user');
    res.json({ message: "User created Successfully", authToken: token }).send();
  } else {
    res.status(401).json({ message: "User already exists" });
  }
});

app.post("/users/login", async (req, res) => {
  // logic to log in user
  const { username, password } = req.headers;
  const user = await User.findOne({username, password});
  if (!user) {
    res.status(403).json({ message: "User authenticaation failed" });
  } else {
    const token = generateJwt(user, 'user');
    res.json({ message: "Successfully logged in", authToken: token });
  }
});

app.get("/users/courses", userAuthenticationJwt, async (req, res) => {
  // logic to list all courses
  const courses = await Course.find({pubished: true});
  res.json({ courses: courses }).send();
});

app.post("/users/courses/:courseId", userAuthenticationJwt , async (req, res) => {
  // logic to purchase a course
  const courseId = req.params.courseId;
  const {username, password} = req.headers;
  const course = await Course.findById({courseId});
  if (!course) {
    res.status(404).json({ message: "Course not found" });
  } else {
    const user = await User.findOne({username, password});
    if (!user) {
      res.status(403).json({ message: "User not found" });
    } else {
      if (!user.purchasedCourse) {
        user.purchasedCourses = [];
      }
      user.purchasedCourses.push(course);
      await user.save();
      res.json({ message: "Course purchased Successfully" }).send();
    }
  }
});

app.get("/users/purchasedCourses", async (req, res) => {
  // logic to view purchased courses
  const {username, password} = req.headers;
  const user = await User.findOne({username, password});
  //console.log(user);
  if (user){
    res.json({ purchasedCourse: user.purchasedCourses || [] }).send();
  } else {
    res.json({ message: "User not found" }).send();
  }
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
