import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axiosInstance from '../../Helpers/axiosinstance';
import { toast } from "react-hot-toast";
const initialState = {
    isLoggedIn: localStorage.getItem('isLoggedIn') || false,
    role: localStorage.getItem('role') || "",
    data: localStorage.getItem('data') != 'undefined' ? JSON.parse(localStorage.getItem('data')) : {}
};
// console.log(localStorage.getItem('data') != undefined);


export const createAccount = createAsyncThunk("/auth/signup", async (data) => {
    try {
        const res = axiosInstance.post("user/register", data);
        toast.promise(res, {
            loading: "Wait! creating your account",
            success: (data) => {
                return data?.data?.message;
            },
            error: "Failed to create account"
        });
        return (await res).data;
    } catch(error) {
        toast.error(error?.response?.data?.message);
    }
})

export const login = createAsyncThunk("auth/login", async (data) => {
    try {
      let res = axiosInstance.post("/user/login", data);
      console.log("response is",res);
      await toast.promise(res, {
        loading: "Loading...",
        success: (data) => {
          return data?.data?.message;
        },
        error: "Failed to log in",
      });
  
      // getting response resolved here
      res = await res;
      return res.data;
    } catch (error) {
        toast.error(error.message);
        
    }
  });

export const logout = createAsyncThunk("/auth/logout", async () => {
    try {
        const res = axiosInstance.get("user/logout");
        toast.promise(res, {
            loading: "Wait! logout in progress...",
            success: (data) => {
                return data?.data?.message;
            },
            error: "Failed to log out"
        });
        return (await res).data;
    } catch(error) {
        toast.error(error?.response?.data?.message);
    }
});

export const updateProfile = createAsyncThunk("/user/update/profile", async (data) => {
    try {
        const res = axiosInstance.post(`user/update/${data[0]}`, data[1]);
        toast.promise(res, {
            loading: "Wait! profile update in progress...",
            success: (data) => {
                return data?.data?.message;
            },
            error: "Failed to update profile"
        });
        return (await res).data;
    } catch(error) {
        toast.error(error?.response?.data?.message);
    }
})

export const getUserData = createAsyncThunk("/user/details", async () => {
    try {
        const res = axiosInstance.get("user/me");
        return (await res).data;
    } catch(error) {
        toast.error(error.message);
    }
})
export const changePassword = createAsyncThunk(
    "/auth/changePassword",
    async (userPassword) => {
      try {
        let res = axiosInstance.post("/user/changepassword", userPassword);
  
        await toast.promise(res, {
          loading: "Loading...",
          success: (data) => {
            return data?.data?.message;
          },
          error: "Failed to change password",
        });
  
        // getting response resolved here
        res = await res;
        return res.data;
      } catch (error) {
        toast.error(error?.response?.data?.message);
      }
    }
  );

  export const forgetPassword = createAsyncThunk(
    "auth/forgetPassword",
    async (email) => {
      try {
        let res = axiosInstance.post("/user/forgot-password", { email });
  
        await toast.promise(res, {
          loading: "Loading...",
          success: (data) => {
            return data?.data?.message;
          },
          error: "Failed to send verification email",
        });
  
        // getting response resolved here
        res = await res;
        return res.data;
      } catch (error) {
        toast.error(error?.response?.data?.message);
      }
    }
  );

  export const resetPassword = createAsyncThunk("/user/reset", async (data) => {
    try {
      let res = axiosInstance.post(`/user/reset/${data.resetToken}`, {
        password: data.password,
      });
  
      toast.promise(res, {
        loading: "Resetting...",
        success: (data) => {
          return data?.data?.message;
        },
        error: "Failed to reset password",
      });
      // getting response resolved here
      res = await res;
      return res.data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  });

const authSlice=createSlice({
    name:'auth',
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder
        .addCase(createAccount.fulfilled, (state, action) => {
            localStorage.setItem("data", JSON.stringify(action?.payload?.user));
            localStorage.setItem("isLoggedIn", true);
            localStorage.setItem("role", action?.payload?.user?.userrole);
            state.isLoggedIn = true;
            state.data = action?.payload?.user;
            state.role = action?.payload?.user?.userrole
        })

        .addCase(login.fulfilled, (state, action) => {
            localStorage.setItem("data", JSON.stringify(action?.payload?.user));
            localStorage.setItem("isLoggedIn", true);
            localStorage.setItem("role", action?.payload?.user?.userrole);
            state.isLoggedIn = true;
            state.data = action?.payload?.user;
            state.role = action?.payload?.user?.userrole
        })
        .addCase(logout.fulfilled, (state) => {
            localStorage.clear();
            state.data = {};
            state.isLoggedIn = false;
            state.role = "";
        })
        .addCase(getUserData.fulfilled, (state, action) => {
            if(!action?.payload?.user) return;
            localStorage.setItem("data", JSON.stringify(action?.payload?.user));
            localStorage.setItem("isLoggedIn", true);
            localStorage.setItem("role", action?.payload?.user?.userrole);
            state.isLoggedIn = true;
            state.data = action?.payload?.user;
            state.role = action?.payload?.user?.userrole;
        });
    }
});

// export const {}=authSlice.actions;
export default authSlice.reducer;