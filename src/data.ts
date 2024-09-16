
  interface Book {
  img: string;
  id: number;
  title: string;
  author: string;
  readingStatus: string;
}
  type books = Book[];

  export const books: books = [
      { id: 1, title: 'Don Quixote', author: 'Miguel Cervantes', readingStatus: 'reading', img: '/images/book1.png' },
      { id: 2, title: 'Lord of Rings', author: 'John Ronald Reuel ', readingStatus: 'favorite list', img: '/images/book2.png' },
      { id: 3, title: '1984', author: 'George Orwell', readingStatus: 'read', img: '/images/book3.png' },
      { id: 4, title: 'The Lion, the Witch', author: 'C. S. Lewis', readingStatus: 'read', img: '/images/book4.png' },
      { id: 5, title: 'Kill Mockingbird', author: 'Harper Lee H.L  ', readingStatus: 'reading', img: '/images/book5.png' },
      { id: 6, title: 'The Little Prince', author: 'Antoine Exupery', readingStatus: 'reading', img: '/images/book6.png' },
      { id: 7, title: 'Ghazaliyat', author: 'Saadi Shirazi', readingStatus: 'reading', img: '/images/book7.png' },
      { id: 8, title: 'Asrar Nameh', author: 'Attar Nishabouri', readingStatus: 'reading', img: '/images/book8.png' },
    
  ];


  
