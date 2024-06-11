import { useEffect, useState } from "react"
import HomeLayout from "../../Layouts/HomeLayout"
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteCourseLecture, getCourseLectures } from "../../Redux/Slices/LectureSlice";

function DisplayLectures()
{
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {state} = useLocation(); 
    const {lectures} = useSelector((state) => state.lecture);
    // console.log("lectures are",lectures[0])
    const {data} = useSelector((state) => state.auth);
    const role=data.userrole;
    const [currentVideo, setCurrentVideo] = useState(0);

    async function onLectureDelete(courseId, lectureId) {
        console.log(courseId, lectureId);
        await dispatch(deleteCourseLecture({courseId: courseId, lectureId: lectureId}));
        await dispatch(getCourseLectures(courseId));
    }
    
    useEffect(() => {
        console.log(state);
        if(!state) navigate("/courses");
        dispatch(getCourseLectures(state._id));
    }, []);
    return(
        <HomeLayout>
            <div className="flex flex-col gap-10 items-center justify-center min-h-[90vh] py-10 text-wihte mx-[5%]">
                <div className="text-center text-2xl font-semibold text-yellow-500">
                        Course Name: {state?.title}
                </div>
                {(lectures && lectures.length>0) ?( <div className="flex justify-center gap-10 w-full">
                    <div className="space-y-5 w-[28rem] p-2 rounded-lg shadow-[0_0_10px_black]">
                        <video 
                            src={lectures && lectures[currentVideo]?.lecture?.secure_url}
                            className="object-fill rounded-tl-lg rounded-tr-lg w-full"   
                            controls
                            disablePictureInPicture
                            muted
                            controlsList="nodownload"

                        >
                        </video> 
                        <div>
                            <h1 className="text-white">
                                <span className="text-yellow-500"> Title: {" "}
                                </span>
                                {lectures && lectures[0]?.title}
                            </h1>
                            <p className="text-white">
                                <span className="text-yellow-500 line-clamp-4">
                                    Description: {" "}
                                </span>
                                {lectures && lectures[currentVideo]?.description}
                            </p>
                           
                        </div>

                        
                    

                    </div>
                    <ul className="w-[28rem] p-2 rounded-lg shadow-[0_0_10px_black] space-y-4">
                        <li className="font-semibold text-xl text-yellow-500 flex items-center justify-between">
                            <p>Lectures list</p>
                            {role === "ADMIN" && (
                                <button onClick={() => navigate("/course/addlecture", {state: {...state}})}ick className="btn-primary px-2 py-1 rounded-md font-semibold text-sm bg-purple-900">
                                    Add new lecture
                                </button>
                            )}
                        </li> 
                        {lectures && 
                            lectures.map((lecture, idx) => {
                                return (
                                    <li className="space-y-2" key={lecture._id} >
                                        <p className="cursor-pointer text-white" onClick={() => setCurrentVideo(idx)}>
                                            <span className="text-white">
                                                {" "} Lecture {idx + 1} : {" "}
                                            </span>
                                            {lecture?.title}
                                        </p>
                                        {role === "ADMIN" && (
                                            <button onClick={() => onLectureDelete(state?._id, lecture?._id)} className="btn-accent px-2 py-1 rounded-md font-semibold text-sm bg-blue-900">
                                                Delete lecture
                                            </button>
                                        )}
                                    </li>
                                )
                            })    
                        }
                   </ul>



                </div>):(
                    role === "ADMIN" && (
                        <button onClick={() => navigate("/course/addlecture", {state: {...state}})}ick className="btn-primary px-2 py-1 rounded-md font-semibold text-sm bg-purple-900">
                            Add new lecture
                        </button>
                    )
                )}

            </div>

        </HomeLayout>
    )

}

export default DisplayLectures