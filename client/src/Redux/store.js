import {configureStore} from '@reduxjs/toolkit';

import authSliceReducer from './Slices/AuthSlice';
import courseSliceReducer from './Slices/CourseSlice'
import razorSliceReducer from './Slices/RazorpaySlice'
import lectureSliceReducer from './Slices/LectureSlice';

const store=configureStore({
        reducer:{
            auth:authSliceReducer,
            course:courseSliceReducer,
            razorpay:razorSliceReducer,
            lecture:lectureSliceReducer
        },
        devTools:true
});
export default store;