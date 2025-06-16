// authThunk.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../utils/axiosConfig";


export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (formData, { rejectWithValue }) => {
    try {
      await axios.post("http://localhost:3000/users/signup", formData);
     
      return true;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Eroare la înregistrare"
      );
    }
  }
);
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        "http://localhost:3000/users/login",
        formData
      );
      return res.data; 
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Eroare la login"
      );
    }
  }
);
