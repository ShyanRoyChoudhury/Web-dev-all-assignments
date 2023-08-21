import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Login from './components/Login';
import Landing from "./components/Landing";
import CreateCourse from './components/CreateCourse';
import Register from './components/Register';
import ShowAllCourses from './components/ShowAllCourses';
import EditCourse from './components/EditCourse';
import ViewCourse from './components/ViewCourse';

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
                <Route path="/showallcourses" element={<ShowAllCourses />} />
                <Route path="/editcourse" element={<EditCourse />} />
                <Route path='/viewcourse/:id' element={<ViewCourse />}/>
            </Routes>
        </Router>
    );
}

export default App;