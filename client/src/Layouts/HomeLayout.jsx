import { useState } from 'react';
import {AiFillCloseCircle} from 'react-icons/ai';
import {FiMenu} from 'react-icons/fi';
import {useDispatch,useSelector} from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../Redux/Slices/AuthSlice';

import Footer from '../Components/Footer';
// import { logout } from '../Redux/Slices/AuthSlice';
function HomeLayout({children})
{
    const dispatch=useDispatch();
    const navigate=useNavigate();

    const isLoggedIn = useSelector((state) => state?.auth?.isLoggedIn);
    const data = useSelector((state) => state?.auth?.data);
    const role=useSelector((state)=>state?.auth?.role)


    function changeWidth() {
        const drawerSide = document.getElementsByClassName("drawer-side");
        drawerSide[0].style.width = 'auto';
    }

    function hideDrawer() {
        const element = document.getElementsByClassName("drawer-toggle");
        element[0].checked = false;

        const drawerSide = document.getElementsByClassName("drawer-side");
        drawerSide[0].style.width = '0';
    }
    async function handleLogout(e) {
        e.preventDefault();

        const res = await dispatch(logout());
        if(res?.payload?.success)
        navigate("/");
    }
    return(
        <div className="min-h-[90vh] bg-gray-800">
           <div className="drawer absolute left-0 z-50 w-fit">
                <input className="drawer-toggle" id="my-drawer" type="checkbox"  />
                <div className="drawer-content">
                    <label htmlFor='my-drawer'  className="cursor-pointer relative">
                        <FiMenu 
                            onClick={changeWidth}
                            size={"32px"}
                            className="font-bold text-white m-4 "
                        />
                    </label>
                </div>
                <div className='drawer-side w-0'>
                    <label htmlFor="my-drawer" className='drawer-overlay'></label>
                    <ul className="menu p-4 w-48 sm:w-80 bg-gray-800 text-base-content relative">
                        <li className='w-fit absolute right-2 z-50 text-white'>
                            <button onClick={hideDrawer}>
                                <AiFillCloseCircle size={24}/>
                            </button>
                        </li>
                        <li className='text-white'>
                            <Link to="/">Home</Link>
                        </li>
                
                        {isLoggedIn && role === 'ADMIN' && (
                            <li className='text-white'>
                                <Link to="/course/create"> Create new course</Link>
                            </li>
                        )}
                        <li className='text-white'>
                            <Link to="/courses">All courses</Link>
                        </li>
                        <li className='text-white'>
                            <Link to="/contact">Contact Us</Link>
                        </li>
                        <li className='text-white'>
                            <Link to="/about">About Us</Link>
                        </li>
                        {!isLoggedIn && (
                                <div className="w-full flex items-center justify-center gap-2">
                                    <button className='btn-primary px-4 py-1 font-semibold rounded-md w-full bg-blue-700'>
                                        <Link to="/login" id="abc">Login</Link>
                                    </button>
                                    <button className='btn-secondary px-4 py-1 font-semibold rounded-md w-full bg-purple-700'>
                                        <Link to="/signup">Signup</Link>
                                    </button>
                                </div>
                        )}

                        {isLoggedIn && (
                                <div className="w-full flex items-center justify-center gap-2">
                                    <button className='px-4 py-1 font-semibold rounded-md w-full bg-blue-700'>
                                        <Link to="/user/profile">Profile</Link>
                                    </button>
                                    <button className='px-4 py-1 font-semibold rounded-md w-full bg-purple-700'>
                                        <Link onClick={handleLogout}>Logout</Link>
                                    </button>
                                </div>
                        )}
                    </ul>
                </div>
           </div>
           {children}
           <Footer/>

        </div>
    )

}
export default HomeLayout;