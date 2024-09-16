import { createSlice } from '@reduxjs/toolkit';

interface Book {
  id: number;
  title: string;
  author: string;
  readingStatus: string;
  img: string;
}

interface MyShelfState {
  myShelf: Book[];
}

const initialState: MyShelfState = {
  myShelf: [],
};

const myShelfSlice = createSlice({
  name: 'myShelf',
  initialState,
  
  reducers: {
    addBookToShelf(state, action: { payload: Book }) {
      console.log('Updating myShelf state:', action.payload);
      localStorage.setItem('myShelf', JSON.stringify(state.myShelf));
      state.myShelf = [...state.myShelf, action.payload];
      console.log('myShelf state after update:', state.myShelf);
    },
    removeBookFromShelf(state, action: { payload: number }) {
      
      state.myShelf = state.myShelf.filter((book) => book.id !== action.payload);
      localStorage.setItem('myShelf', JSON.stringify(state.myShelf));
    },
    updateBookReadingStatus(state, action: { payload: { bookId: number, newStatus: string } }) {
      state.myShelf = state.myShelf.map((book) => {
        if (book.id === action.payload.bookId) {
          return { ...book, readingStatus: action.payload.newStatus };
        }
        return book;
      });
      localStorage.setItem('myShelf', JSON.stringify(state.myShelf));
    },
  },
});

export const { addBookToShelf, removeBookFromShelf, updateBookReadingStatus } = myShelfSlice.actions;
export default myShelfSlice.reducer;