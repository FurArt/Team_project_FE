import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface RandomNumbersState {
  usedNumbers: number[];
}

const initialState: RandomNumbersState = {
  usedNumbers: [], 
};

const randomNumbersSlice = createSlice({
  name: "randomNumbers",
  initialState,
  reducers: {
    generateRandomNumber: (state, action: PayloadAction<number>) => {
      if (state.usedNumbers.length >= action.payload + 1) {
        console.warn("All numbers have been used!");
        return;
      }

      let randomNum;
      do {
        randomNum = Math.floor(Math.random() * (action.payload + 1));
      } while (state.usedNumbers.includes(randomNum));

      state.usedNumbers.push(randomNum);
    },
    resetNumbers: (state) => {
      state.usedNumbers = [];
    },
  },
});

export const { generateRandomNumber, resetNumbers } = randomNumbersSlice.actions;
export default randomNumbersSlice.reducer;
