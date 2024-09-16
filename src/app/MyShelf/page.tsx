"use client"
import { useRef, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addBookToShelf, removeBookFromShelf } from '../redux/features/myShelfSlice';
import Link from 'next/link';
import { books } from '../../data';
import BookCard from '@/components/BookCard';
import { IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

interface Book {
  img: string;
  id: number;
  title: string;
  author: string;
  readingStatus: string;
}

const MyShelf = () => {

  const dispatch = useDispatch();
  const myShelf = useSelector((state: { myShelf: { myShelf: any } }) => state.myShelf.myShelf);
  const mountedRef = useRef(false);
  const [localStorageMyShelf, setLocalStorageMyShelf] = useState([]);

  useEffect(() => {
    const storedMyShelf = localStorage.getItem('myShelf');
    if (storedMyShelf) {
      setLocalStorageMyShelf(JSON.parse(storedMyShelf));
    }
  }, []);

  useEffect(() => {
    if (!mountedRef.current) {
      mountedRef.current = true;
      if (myShelf.length === 0) {
        books.forEach((book) => dispatch(addBookToShelf(book)));
      }
    }
    localStorage.setItem('myShelf', JSON.stringify(myShelf));
  }, [myShelf]);

  return (
    <div className=' bg-custom-Bg' >
      <Link href={`/Search`}>
        <span className="h-[100px] rounded-sm px-4 py-2 text-lg cursor-pointer"
        >
         <IconButton  className=" text-custom-blue py-10" >
             <SearchIcon />Explore and Add New Books
         </IconButton> 
        </span>
      </Link>
      <ul className=' bg-custom-Bg flex gap-10 pt-10 flex-wrap p-20 justify-center items-center'>
        {myShelf.map((book: Book) => (
          <li key={book.id}>
            <BookCard book={book} />
          </li>
        ))}
      </ul>
      
    </div>
  );
};


export default MyShelf;