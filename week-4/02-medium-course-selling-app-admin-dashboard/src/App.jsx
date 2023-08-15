import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Login from './components/Login';
import Landing from "./components/Landing";
import CreateCourse from './components/CreateCourse';
import Register from './components/Register';
import ShowCourses from './components/ShowCourses';
import EditCourse from './components/EditCourse';
//import Navbar from './components/navbar';


// This file shows how you can do routing in React.
// Try going to /login, /register, /about, /courses on the website and see how the html changes
// based on the route.
// You can also try going to /random and see what happens (a route that doesnt exist)
function App() {

    //add default location to landing page
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/createcourse" element={<CreateCourse />} />
                <Route path="/showcourses" element={<ShowCourses />} />
                <Route path="/editcourse" element={<EditCourse />} />
            </Routes>
        </Router>
    );
}

export default App;