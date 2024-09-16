import BookCard from './BookCard';
import {books} from '../data'

const BookShelf = () => {
  
  return (    
          <ul style={{display: "flex",gap: "15px"}}>
          {books.filter((book) => book.readingStatus === "reading").map((book) => (
            <li key={book.id}>
              <BookCard book={book} />
            </li>
          ))}
        </ul>
  );
};

export default BookShelf;