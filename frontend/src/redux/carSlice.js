import { createSlice } from "@reduxjs/toolkit";

const carSlice = createSlice({
  name: "car",
  initialState: {
    cars: [],
    singleCar: null,
    searchedQuery: "",
  },
  reducers: {
    setCars: (state, action) => {
      state.cars = action.payload;
    },
    setSingleCar: (state, action) => {
      state.singleCar = action.payload;
    },
    setSearchedQuery: (state, action) => {
      state.searchedQuery = action.payload;
    }
  },
});

export const { setCars, setSingleCar, setSearchedQuery } = carSlice.actions;
export default carSlice.reducer;