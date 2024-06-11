import { Route } from 'react-router-dom';
import {Routes} from 'react-router-dom'

import HomePage from './Pages/HomePage';
import AboutUs from './Pages/AboutUs';
import NotFound from './Pages/NotFound';
import SignUp from './Pages/SignUp';
import Login from './Pages/Login';
import CourseList from './Pages/Course/CourseList';
import Contact from './Pages/Contact';
import Denied from './Pages/Denied';
import CourseDescription from './Pages/Course/CourseDescription';
import RequireAuth from './Components/Auth/RequireAuth';
import CreateCourse from './Pages/Course/CreateCourse';
import Profile from './Pages/User/Profile';
import EditProfile from './Pages/User/EditProfile';
//import Checkout from './Pages/Payment/Checkout';
import DisplayLectures from './Pages/Dashboard/DisplayLectures';
import Addlecture from './Pages/Dashboard/Addlecture';
import ChangePassword from './Pages/User/Changepassword';
import ForgetPassword from './Pages/User/Forgotpassword';
import ResetPassword from './Pages/User/Resetpassword';


function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage/>}></Route>
        <Route path="/about" element={<AboutUs/>}></Route>
        <Route path="*" element={<NotFound/>}></Route>
        <Route path="/signup" element={<SignUp/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/courses" element={<CourseList/>}></Route>
        <Route path="/contact" element={<Contact/>}></Route>
        <Route path="/denied" element={<Denied/>}></Route> 
        <Route path="/forgot" element={<ForgetPassword/>}></Route>
        <Route path="/reset/:resetToken" element={<ResetPassword />} />

        <Route path="/course/description" element={<CourseDescription/>}></Route>
        <Route element={<RequireAuth allowedRoles={["ADMIN"]} />}>
        <Route path="/course/create" element={<CreateCourse />} />
        <Route path="/course/addlecture" element={<Addlecture />} />

        </Route>
        <Route element={<RequireAuth allowedRoles={["ADMIN","USER"]} />}>
        <Route path="/user/profile" element={<Profile/>}></Route>
        <Route path="/user/editprofile" element={<EditProfile/>}></Route>
        <Route path="/course/displaylectures" element={<DisplayLectures/>}></Route>
        <Route path="/changepassword" element={<ChangePassword/>}></Route>
        </Route>

      </Routes>
      {/* <HomeLayout/> */}
    
    </>
  )
}

export default App
