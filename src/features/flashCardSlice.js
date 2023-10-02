// Import the 'createSlice' function from the '@reduxjs/toolkit' package.
import { createSlice } from "@reduxjs/toolkit";


// Retrieve data from local storage and parse it as JSON.
const localStoreData = localStorage.getItem("Flashcard");
let parsedData = null;

try {
  parsedData = JSON.parse(localStoreData);
} catch (error) {
  console.error("Error parsing JSON:", error);
}


// Define the initial state of the flashcard slice.
const initialState = {
  flashcards: parsedData ? parsedData : [], // Set the initial state to parsedData if available, otherwise an empty array.
};

// Created 'flashcardSlice' slice.
const flashcardSlice = createSlice({
  name: "flashcard", // Name of the slice, used in actions and reducers.
  initialState, // Initial state for the slice.
  reducers: {
    // Reducer function to add a new flashcard to the state.
    addFlashcard: (state, action) => {
      // When the 'addFlashcard' action is dispatched, this reducer is called.
      // It receives the 'state' and the 'action' payload as arguments.
      // The newflashcard object is pushed to the 'flashcards' array in the state.
      state.flashcards.unshift(action.payload);
      //set the addFlashcard to the local storeage 
      localStorage.setItem("Flashcard", JSON.stringify(state.flashcards));
    },
    deleteFlashcard: (state, action) => {
      const flashcardIndex = action.payload;
      // Remove the flashcard at the specified index from the state
      state.flashcards.splice(flashcardIndex, 1);
      // Update the local storage with the modified flashcards array
      localStorage.setItem("Flashcard", JSON.stringify(state.flashcards));
    },
  },
});


// This function is used to access the 'flashcards' array from the Redux store.
export const selectAll = (state) => state.flashcard.flashcards;


// This action can be dispatched to add a new flashcard to the state.
export const { addFlashcard, deleteFlashcard } = flashcardSlice.actions;


export default flashcardSlice.reducer;
