"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { addBookToShelf, removeBookFromShelf, updateBookReadingStatus } from '../app/redux/features/myShelfSlice';

interface Book {
  img: string ;
  status: string;
  id: number;
  title: string;
  author: string;
  readingStatus: 'reading' | 'favorite list' | 'already read';
  coverImage: string;
}

const BookSearch = () => {
  const dispatch = useDispatch();
  const myShelf = useSelector((state: { myShelf: { myShelf: any } }) => state.myShelf.myShelf);
  const [books, setBooks] = useState<Book[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [notFound, setNotFound] = useState(false);
  const [visibleBooks, setVisibleBooks] = useState(10);
  const [searching, setSearching] = useState(false);
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');
  const [searchShelf, setSearchShelf] = useState<Book[]>([]);
  const [localStorageSearchShelf, setLocalStorageSearchShelf] = useState([]);

  useEffect(() => {
    const storedSearchShelf = localStorage.getItem('searchShelf');
    if (storedSearchShelf) {
      setLocalStorageSearchShelf(JSON.parse(storedSearchShelf));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('searchShelf', JSON.stringify(searchShelf));
  }, [searchShelf]);

//CALL BOOK API 
  useEffect(() => {
    const getBookInfo = (searchQuery: string) => {
      setSearching(true);
      const API_ENDPOINT = 'https://openlibrary.org/search.json';
      axios.get(`${API_ENDPOINT}`, {
        params: {
          title: searchQuery,
        },
      })
      .then(response => {
        const bookInfo = response.data.docs;
        const booksWithImgAndStatus = bookInfo.map((book: any) => {
          return {
            title: book.title_suggest,
            author: book.author_name && book.author_name[0],
            id: book.key,
            img: `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`,
            status: 'Available',
          };
        });
        setBooks(booksWithImgAndStatus);
        if (booksWithImgAndStatus.length === 0) {
          setNotFound(true);
        } else {
          setNotFound(false);
        }
        setSearching(false);
      })
      .catch(error => {
        console.error(error,"CALL BOOK API error:");
        setSearching(false);
      });
    };

    if (debouncedSearchQuery !== '') {
      getBookInfo(debouncedSearchQuery);
    }
  }, [debouncedSearchQuery]);


  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 2000);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  useEffect(() => {
    if (searchQuery === '') {
      setBooks([]);
      setNotFound(false);
    }
  }, [searchQuery]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  const handleShowMore = () => {
    setVisibleBooks(visibleBooks + 5);
  };
  const handleSearchButtonClick = () => {
    if (searchQuery !== '') {
      setDebouncedSearchQuery(searchQuery);
    }
  };
  const handleClearSearch = () => {
    setSearchQuery('');
    setBooks([]);
    setNotFound(false);
  };
  const handleAddBookToShelf = (book: Book) => {
    const newBook: Book = { ...book, readingStatus: 'reading' as 'reading' }; // cast to 'reading' type
    setSearchShelf([...searchShelf, newBook]);
    dispatch(addBookToShelf(newBook));
  };
  const handleRemoveBookFromShelf = (bookId: number) => {
    setSearchShelf(searchShelf.filter((book) => book.id !== bookId));
    dispatch(removeBookFromShelf(bookId));
  };
  const handleUpdateReadingStatus = (bookId: number, newStatus: 'reading' | 'favorite list' | 'already read') => {
    dispatch(updateBookReadingStatus({ bookId, newStatus }));
    const bookIndex = searchShelf.findIndex((book) => book.id === bookId);
    if (bookIndex !== -1) {
      const updatedBook = { ...searchShelf[bookIndex], readingStatus: newStatus };
      setSearchShelf([
        ...searchShelf.slice(0, bookIndex),
        updatedBook,
        ...searchShelf.slice(bookIndex + 1),
      ]);
    }
  };
//display only the searched books on the Search page, and not the default books that are already in shelf.
const filteredBooks = books.filter((book) => {
  console.log('AAA-filtering book:', book);
  return (
    book.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
    !myShelf.some((shelfBook: Book) => shelfBook.id === book.id) &&
    !myShelf.includes(book)
  );
});

  return (
    <div className='bg-custom-Bg px-10 py-30 h-[2600px]'>
      <h1 className="pt-20 text-custom-blue">Discover New Book</h1>
      <input
        type="search"
        value={searchQuery}
        className="px-4 py-2 rounded-md border border-gray-300 outline-blue-500"
        onChange={handleSearch}
        placeholder="Search for books"
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleSearchButtonClick();
          }
        }}
        onBlur={() => {
          if (searchQuery === '') {
            setBooks([]);
            setNotFound(false);
          }
        }}
      />
      <button className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded-md" onClick={handleSearchButtonClick}>Search</button>
      <button className="bg-rose-500 hover:bg-rose-700 text-white font-bold py-2 px-4 rounded-md" onClick={handleClearSearch}>Clear</button>
      {searching && <p style={{ color: 'green',paddingTop:"3px" }}>Searching and receiving books for display, please wait...</p>}
      {notFound && <p style={{ color: 'red' }}>A book with this title was not found!</p>}
      <ul className="flex flex-wrap justify-center gap-4 pt-20 text-center" >
        {filteredBooks.slice(0, visibleBooks).map((book) => (
         <li className="border-solid border-[#e11d48] border-[1px] min-h-[380px] rounded-[1px_15px] p-2 shadow-[0_0_6px_1px]" key={book.id}>
            <h2 className="w-[260px] text-lg font-bold">{book.title}</h2>
            <p className="text-gray-600">by {book.author}</p>
            <img src={book.img} alt={book.title} className="relative left-10 pb-2 w-48 h-48 object-cover rounded-md" />
            <button
              onClick={() => handleAddBookToShelf(book)}
              className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded-md"
            >
              Add to MyShelf
            </button>
          </li>
        ))}
      </ul>
      {filteredBooks.length > visibleBooks && (
        <button className="bg-brown-500 hover:bg-brown-700  text-custom-blue font-bold py-6 px-4 rounded-md" onClick={handleShowMore}>Click For Show More Results</button>
      )}
      <h2 style={{ color: '#2aa56d' }}>*MyShelf after add new Book*</h2>
      <ul className="flex justify-center gap-4 p-6" >
        {searchShelf.map((book:Book) => (
          <li className="flex flex-col items-center border border-red-500 p-3" key={book.id}>
              <h2 className="text-lg font-bold">{book.title}</h2>
              <p className="text-gray-600">by {book.author}</p>
              <img src={book.img} alt={book.title} className="w-48 h-48 object-cover rounded-md" />
              <p className="p-10 text-gray-600">
                Reading Status:
                <select
                  value={book.readingStatus}
                  onChange={(e) => handleUpdateReadingStatus(book.id, e.target.value as 'reading' | 'favorite list' | 'already read')}
                  className="bg-white border border-gray-300 rounded-md py-2 px-4"
                >
                  <option value="reading">Reading</option>
                  <option value="favorite list">Favorite List</option>
                  <option value="already read">Already Read</option>
                </select>
              </p>
              <button
                onClick={() => handleRemoveBookFromShelf(book.id)}
                className="bg-rose-500 hover:bg-rose-700 text-white font-bold py-2 px-4 rounded-md"
              >
                Remove from Shelf
              </button>
              <Link href={`/MyShelf`}>
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
                >
                  back to MYShelf page
                </button>
              </Link>
        </li>
        ))}
      </ul>
    </div>
  );
};

export default BookSearch;