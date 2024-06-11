import { useState } from "react";
import HomeLayout from "../Layouts/HomeLayout";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {toast} from 'react-hot-toast';
import { login } from "../Redux/Slices/AuthSlice";

function Login()
{
    const dispatch=useDispatch();
    const navigate=useNavigate();

    // initializes the state loginData with empty values for email and password, and setLoginData is a function to update the state
    const [loginData, setLoginData] = useState({        
        email: "",
        password: "",
    });

    // updates the loginData state with the new values. The name attribute of the input field is used as a key to update the corresponding field in the state.
    function handleUserInput(e) {
        const {name, value} = e.target;
        setLoginData({
            ...loginData,
            [name]: value
        })
    }

    //called when the form is submitted. prevents the default form submission behavior, checks if both email and password are filled, and if so, dispatches a login action with the loginData to the Redux store. If the login is successful (response.payload.success), it navigates to the home page ("/"). Finally, it resets the loginData state to empty values.
    async function onLogin(event)
    {
        event.preventDefault();
        if(!loginData.email || !loginData.password) {
            toast.error("Please fill all the details");
            return;
        }
        
        // dispatch create account action
        const response = await dispatch(login(loginData));
        if(response?.payload?.success)
        {
            navigate("/");
        }

        setLoginData({
            email: "",
            password: "",
        });
    }


    return(
        <HomeLayout>
            <div className="flex items-center justify-center h-[100vh]">
                <form noValidate onSubmit={onLogin} className="flex flex-col justify-center gap-3 rounded-lg p-4 text-white w-96 shadow-[0_0_10px_black]">
                    <h1 className="text-center text-2xl font-bold">Login Page</h1>
                    <div className='flex flex-col gap-1'>
                    <label htmlFor="email" className='font-semibold'> Email </label>
                        <input 
                            type="email" 
                            required
                            name="email"
                            id="email"
                            placeholder="Enter your email.."
                            className="bg-transparent px-2 py-1 border"
                            onChange={handleUserInput}
                            value={loginData.email}
                        />
                    </div>
                    <div className='flex flex-col gap-1'>
                        <label htmlFor="password" className='font-semibold'> Password </label>
                        <input 
                            type="password" 
                            required
                            name="password"
                            id="password"
                            placeholder="Enter your password.."
                            className="bg-transparent px-2 py-1 border"
                            onChange={handleUserInput}
                            value={loginData.password}
                        />
                    </div>
                    <button id="submit_login" type="submit" className=" mt-1 bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold text-lg cursor-pointer">
                        Login
                    </button>
                    <Link to="/forgot" className='link text-accent cursor-pointer'> Forgot password ?</Link>
                    <p className="text-center">
                    Do not have an account ? <Link to="/signup" className='link text-accent cursor-pointer'> Signup</Link>
                    </p>


                </form>

            </div>

        </HomeLayout>
    )

}
export default Login;