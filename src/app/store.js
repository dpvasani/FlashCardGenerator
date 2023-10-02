//imported configureStore and flashcardReducer
import { configureStore } from "@reduxjs/toolkit";
import flashcardReducer  from "../features/flashCardSlice";

//created redux state for flashcard in store
const Store = configureStore({
    reducer: {
    flashcard: flashcardReducer,
 },

})

export default Store;