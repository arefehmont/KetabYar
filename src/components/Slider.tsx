"use client"
import Image from "next/image";
import React, { useEffect, useState } from "react";

const data = [
  {
    id: 1,
    title: "Welcome to Virtual bookshelf! Add or Remove books from Your shelf, and change reading status",
    image: "/slide1.jpg",
  },
  {
    id: 2,
    title: "Users can set a monthly reading goal and track their progress for reading books",
    image: "/slide2.png",
  },
  {
    id: 3,
    title: "Users can search for more new books by title or author in Book search Page",
    image: "/slide3.jpg",
  },
];

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(
      () =>
        setCurrentSlide((prev) => (prev === data.length - 1 ? 0 : prev + 1)),
      4000
    );
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="Slider flex flex-col  h-[calc(100vh-6rem)] lg:h-[calc(100vh-7rem)] lg:flex-row bg-fuchsia-50 pl-20 absolute top-[100px] right-0 md:flex-row md:w-screen md:pl-0">
      {/* TEXT CONTAINER */}
      <div className="flex-1 flex items-center justify-center flex-col gap-8 text-rose-600 font-bold ">
        <h1
          className={`text-4xl text-center p-4 md:p-10 md:text-4xl xl:text-4xl ${
            currentSlide === 0
              ? "animate-fade-in"
              : currentSlide === 1
              ? "animate-fade-in"
              : "animate-fade-out"
          }`}
        >
          {data[currentSlide].title}
        </h1>
      </div>
      {/* IMAGE CONTAINER */}
      <div className="w-full flex-1 relative ">
        <Image
          src={data[currentSlide].image}
          alt="Img slide"
          fill
          className={`animate-slide-in py-[30px] pr-[30px] object-cover ${
            currentSlide === 0
              ? "animate-slide-in"
              : currentSlide === 1
              ? "animate-slide-in"
              : "animate-slide-out"
          }`}
        />
      </div>
    </div>
  );
};

export default Slider;