import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axiosInstance from "../../Helpers/axiosinstance";
import toast from "react-hot-toast";

const initialState = {
    courseData: []
}

export const getAllCourses = createAsyncThunk("/course/get", async () => {
    try {
        const response = axiosInstance.get("/courses");
        toast.promise(response, {
            loading: "loading course data...",
            success: "Courses loaded successfully",
            error: "Failed to get the courses",
        });

        return (await response).data.courses;
    } catch(error) {
        toast.error(error?.response?.data?.message);
    }
}); 
export const deleteCourse = createAsyncThunk("/course/delete", async (id) => {
    console.log("dd")
    try {
      const res = axiosInstance.delete(`courses/${id}`);
  
      toast.promise(res, {
        loading: "Deleting the course...",
        success: "Courses deleted successfully",
        error: "Failed to delete course",
      });
  
      const response = await res;
  
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  });

export const createNewCourse=createAsyncThunk("/course/create",async(data)=>
{
    try{
        let formData = new FormData();
        formData.append("title", data?.title);
        formData.append("description", data?.description);
        formData.append("category", data?.category);
        formData.append("createdby", data?.createdby);
        formData.append("thumbnail", data?.thumbnail);
        const response = axiosInstance.post("/courses", formData);
        toast.promise(response, {
            loading: "Creating new course",
            success: "Course created successfully",
            error: "Failed to create course"
        });

        return (await response).data

    }catch(e)
    {
        toast.error(e?.response?.data?.message);
    }
})
const courseSlice = createSlice({
    name: "courses",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllCourses.fulfilled, (state, action) => {
            if(action.payload) {
                state.courseData = [...action.payload];
            }
        })
    }
});
export default courseSlice.reducer;