import React from 'react';
import BookShelf from '../components/BookShelf';
import ReadingChallenge from '../components/ReadingChallenge';
import Slider from '@/components/Slider';
import "./globals.css";
const Home = () => {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen md:bg-white lg: bg-custom-Bg gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 md:w-full md:max-w-[1440px] items-center sm:items-start">
        <Slider/>
        <h1 className='text-[22px] border-b-[1px] text-custom-blue border-custom-blue font-normal lg:pt-[400px] md:pt-[300px]' > Display the list of books currently being read by the user </h1>
        <BookShelf />
        <h1 className='text-[22px] border-b-[1px] text-custom-blue border-custom-blue font-normal ' > Display the monthly reading goal and track the progress Challenge </h1>
        <ReadingChallenge />
      </main>
    </div>
  );
};

export default Home;
