'use client'
import {configureStore} from "@reduxjs/toolkit";
import myShelfSlice from "./features/myShelfSlice";

export const store1 = configureStore({
  reducer:{
      myShelf: myShelfSlice,
  }
});

export const updateBookReadingStatus = (bookId: number, newStatus: 'reading' | 'favorite list' | 'already read') => {
    return {
      type: 'UPDATE_BOOK_READING_STATUS',
      payload: { bookId, newStatus },
    };
  };