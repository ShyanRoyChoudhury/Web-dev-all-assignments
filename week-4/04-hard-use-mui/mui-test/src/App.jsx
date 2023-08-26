import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
//import Login from './components/Login';
//import Landing from "./components/Landing";
//import CreateCourse from './components/CreateCourse';
import Appbar from './components/Appbar';
import Register from './components/Register';
import Signin from './components/Signin';
//import ShowAllCourses from './components/ShowAllCourses';
//import EditCourse from './components/EditCourse';
//import ViewCourse from './components/ViewCourse';

// This file shows how you can do routing in React.
// Try going to /login, /register, /about, /courses on the website and see how the html changes
// based on the route.
// You can also try going to /random and see what happens (a route that doesnt exist)
function App() {

    //add default location to landing page
    return (
        <div style={{backgroundColor:"#e4eeed", width:"100vh", height:"100vh"}}>
            
            
            <Router>
                <Appbar/>
                <Routes>
                    <Route path="/signin" element={<Signin/>}/>
                    <Route path="/Register" element={<Register/>}/>
                </Routes>
            </Router>

            
                    
                    
                    
        </div>
    );
}

export default App;