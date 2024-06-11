import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import HomeLayout from "../../Layouts/HomeLayout";
import { useDispatch, useSelector } from "react-redux";
import { deleteCourse, getAllCourses } from "../../Redux/Slices/CourseSlice";

function CourseDescription()
{
    const {state}=useLocation();
    console.log(state._id);
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const { data } = useSelector((state) => state.auth);
    useEffect(()=>
    {

    },[])
    async function Delcourse(courseid)
    {
        await dispatch(deleteCourse(courseid));
        navigate("/courses");
    }
    return(
        <HomeLayout>
            <div className="min-h-[90vh] pt-12 px-20 flex flex-col items-center justify-center text-white">
                <div className="grid grid-cols-2 gap-10 py-10 relative">
                    <div className="space-y-5">
                        <img className="w-full h-64" src={state?.thumbnail?.secure_url} alt="thumbnail" />
                        <div className="space-y-4">
                            <div className="flex flex-col items-center justify-between text-xl">

                                <p className="font-semibold">
                                    <span className="text-yellow-500 font-bold">
                                        Total lectures : {" "}
                                    </span>
                                    {state?.nooflectures}
                                </p>

                                <p className="font-semibold">
                                    <span className="text-yellow-500 font-bold">
                                        Instructor : {" "}
                                    </span>
                                    {state?.createdby}
                                </p>
                                
                                <button onClick={() => navigate("/course/displaylectures", {state: {...state}})} className="bg-yellow-600 text-xl rounded-md font-bold px-5 py-3 w-full hover:bg-yellow-500 transition-all ease-in-out duration-300 mt-5">
                                    Watch lectures
                                </button>
                               
                                { data.userrole === "ADMIN" &&
                                <button onClick={()=>Delcourse(state?._id)}  className="bg-yellow-600 text-xl rounded-md font-bold px-5 py-3 w-full hover:bg-yellow-500 transition-all ease-in-out duration-300 mt-5">
                                    Delete Course
                                </button>
                                
                            }

                            </div>

                        </div>
                    </div>

                    
                    <div className="space-y-2 text-xl">
                        <h1 className="text-3xl font-bold text-yellow-500 mb-5 text-center">
                            {state?.title}
                        </h1>

                        <p className="text-yellow-500">Course description: </p>
                        <p>{state?.description}</p>
                    </div>


                </div>
            </div>

        </HomeLayout>
    )


}

export default CourseDescription;