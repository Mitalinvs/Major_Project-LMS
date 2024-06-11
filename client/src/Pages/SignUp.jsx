import { useState } from "react";
import HomeLayout from "../Layouts/HomeLayout";
import { BsPersonCircle } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {toast} from 'react-hot-toast';
import { isEmail, isspecialcharacter,isdigit,isupper,islower,isspace } from '../Helpers/regexMatcher';
import { createAccount } from "../Redux/Slices/AuthSlice";

function SignUp()
{
    const dispatch=useDispatch();
    const navigate=useNavigate();

    const [signupData, setSignupData] = useState({
        fullname: "",
        email: "",
        password: "",
        avatar: ""
    });
    const [previewImage, setPreviewImage] = useState("");


    function handleUserInput(e) {
        const {name, value} = e.target;
        setSignupData({
            ...signupData,
            [name]: value
        })
    }
    function getImage(event) {
        event.preventDefault();
        // getting the image
        const uploadedImage = event.target.files[0];

        if(uploadedImage) {
            setSignupData({
                ...signupData,
                avatar: uploadedImage
            });
            const fileReader = new FileReader();
            fileReader.readAsDataURL(uploadedImage);
            fileReader.addEventListener("load", function () {
                setPreviewImage(this.result);
            })
        }
    }
    async function createNewAccount(event)
    {
        event.preventDefault();
        if(!signupData.email || !signupData.password || !signupData.fullname || !signupData.avatar) {
            toast.error("Please fill all the details");
            return;
        }
        // checking name field length
        if(signupData.fullname.length < 5) {
            toast.error("Name should be atleast of 5 characters")
            return;
        }
        if(!isEmail(signupData.email)) {
            toast.error("Invalid email id");
            return;
        }
        // // checking password validation
        if((signupData.password.length<8)) {
            toast.error("password should be atleast of 8  characters")
            return;
        }
        if((signupData.password.length>15)) {
            toast.error("password should be not be more than 15  characters")
            return;
        }
        if(!isspecialcharacter(signupData.password)) {
            toast.error("Password should contain one special character");
            return;
        }
        if(!isdigit(signupData.password)) {
            toast.error("Password should contain one digit");
            return;
        }
        if(!islower(signupData.password)) {
            toast.error("Password should contain one lowercase character");
            return;
        }
        if(!isupper(signupData.password)) {
            toast.error("Password should contain one uppercase character");
            return;
        }
        if(isspace(signupData.password)) {
            toast.error("Password should not contain space");
            return;
        }
        // to send to server we require form data
        const formData = new FormData();
        formData.append("fullname", signupData.fullname);
        formData.append("email", signupData.email);
        formData.append("password", signupData.password);
        formData.append("avatar", signupData.avatar);

        // dispatch create account action
        const response = await dispatch(createAccount(formData));
        console.log(response);
        if(response?.payload?.success)
            navigate("/");

        setSignupData({
            fullname: "",
            email: "",
            password: "",
            avatar: ""
        });
        setPreviewImage("");
    }


    return(
        <HomeLayout>
            <div className="flex items-center justify-center h-[100vh]">
                <form noValidate onSubmit={createNewAccount} className="flex flex-col justify-center gap-3 rounded-lg p-4 text-white w-96 shadow-[0_0_10px_black]">
                    <h1 className="text-center text-2xl font-bold">Registration Page</h1>
                    <label htmlFor="image_uploads" className="cursor-pointer">
                        {previewImage?(
                            <img className="w-24 h-24 rounded-full m-auto" src={previewImage} />
                        ):(
                            <BsPersonCircle className='w-24 h-24 rounded-full m-auto' />
                            )}
                    </label>
                    <input 
                        onChange={getImage}
                        className="hidden"
                        type="file"
                        name="image_uploads"
                        id="image_uploads"
                        accept=".jpg, .jpeg, .png, .svg"
                    />
                    <div className='flex flex-col gap-1'>
                        <label htmlFor="fullname" className='font-semibold'> Name </label>
                        <input 
                            type="text" 
                            required
                            name="fullname"
                            id="fullname"
                            placeholder="Enter your name.."
                            className="bg-transparent px-2 py-1 border"
                            onChange={handleUserInput}
                            value={signupData.fullname}
                        />
                    </div>
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
                            value={signupData.email}
                        />
                    </div>
                    <div className='flex flex-col gap-1'>
                        <label htmlFor="password" className='font-semibold'> Password </label>
                        <input 
                            type="text" 
                            required
                            name="password"
                            id="password"
                            placeholder="Enter your password.."
                            className="bg-transparent px-2 py-1 border"
                            onChange={handleUserInput}
                            value={signupData.password}
                        />
                    </div>
                    <button type="submit" id="submit_signup" className=" mt-1 bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold text-lg cursor-pointer">
                        Create Account
                    </button>
                    <p className="text-center">
                        Already have an account ? <Link to="/login" className='link text-accent cursor-pointer'> Login</Link>
                    </p>


                </form>

            </div>

        </HomeLayout>
    )

}
export default SignUp;