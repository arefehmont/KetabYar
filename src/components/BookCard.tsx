"use client"
import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { removeBookFromShelf } from '../app/redux/features/myShelfSlice'
import { useDispatch } from 'react-redux';


interface Book {
  id: number;
  title: string;
  author: string;
  readingStatus: string;
  img: string;
}


const BookCard = ({ book }: { book: Book }) => {
    const dispatch = useDispatch();
    const handleRemoveBookFromShelf = (id: number) => {
      dispatch(removeBookFromShelf(id));
    };
  return (
    <Card className='w-[px]' sx={{ maxWidth: 345 }}>
      <img 
      style={{ width: "200px", height: "200px" }} 
      className='pl-[10%] pt-[10%]'
      src={book.img} 
      alt={book.title} 
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {book.title}
        </Typography>
      <Button className='text-blue-400 text-[10px] cursor-default' >by:{book.author}</Button>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
           Doloribus maxime in dolorem ratione voluptas optio facili.
        </Typography>
      </CardContent>
      <CardActions>
         <h2>{book.readingStatus}</h2>
         <button style={{ color: 'red',fontSize:"14px" }} onClick={() => handleRemoveBookFromShelf(book.id)}>Remove from MyShelf</button>
      </CardActions>
    </Card>
  );
};
export default BookCard;



