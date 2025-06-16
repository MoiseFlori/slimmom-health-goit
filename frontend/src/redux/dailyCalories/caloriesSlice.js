// redux/dailyCalories/caloriesSlice.js
import { createSlice } from "@reduxjs/toolkit";

const caloriesSlice = createSlice({
  name: "dailyCalories",
  initialState: {
    dailyRate: 0,
    consumed: 0,
    notAllowedFoods: [],
    selectedDate: new Date().toISOString().split("T")[0],
  },
  reducers: {
    setDailyRate(state, action) {
      state.dailyRate = action.payload;
    },
    setConsumed(state, action) {
      state.consumed = action.payload;
    },
    setNotAllowedFoods(state, action) {
      state.notAllowedFoods = action.payload;
    },
    setDate(state, action) {
      state.selectedDate = action.payload;
    },
  },
});

export const { setDailyRate, setConsumed, setNotAllowedFoods,setDate } =
  caloriesSlice.actions;
export default caloriesSlice.reducer;
