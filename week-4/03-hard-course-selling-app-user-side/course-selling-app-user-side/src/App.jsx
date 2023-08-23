import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Landing from './components/Landing';
import Courses from './components/Courses';
import Signup from './components/Signup';
import Login from './components/Login';
import ViewCourse from './components/ViewCourse';
import PurchasedCourses from '../../../02-medium-course-selling-app-admin-dashboard/src/components/PurchasedCourses';

function App(){
  return(
    <Router>
      <Routes>
        <Route path="/" element = {<Landing/>}/>
        <Route path="users/courses" element = {<Courses/>}/>
        <Route path="users/signup" element={<Signup/>}/>
        <Route path='users/login' element={<Login/>}/>
        <Route path='users/courses/:courseId' element={<ViewCourse/>}/>
        <Route path='users/courses/purchased' element={<PurchasedCourses/>}/>
      </Routes>
    </Router>
  )
}

export default App;

