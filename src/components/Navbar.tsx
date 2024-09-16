import React from "react";
import Menu from "./Menu";
import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  return (
    <div className="h-1 p-4 flex items-center bg-fuchsia-50 justify-between border-b-2 border-b-rose-600 md:text-3xl lg:text-xl md:h-16 lg:px-20 xl:px-40 sm:w-[468px] md:w-[1340px] lg:w-full !w-full">
      {/* LEFT LINKS */}
      <div className="text-custom-orange text-xl font-normal hidden md:flex gap-4 flex-1">
        <Link href="/">Homepage</Link>
        <Link href="/MyShelf">MyShelf</Link>
        <Link href="/Search">Search</Link>
      </div>
      {/* LOGO */}
      <div className="text-rose-600 text-xl uppercase md:font-bold flex-1 md:text-center">
        <Link href="/">KetabYar</Link>
      </div>
      {/* MOBILE MENU */}
      <div className="md:hidden">
        <Menu />
      </div>
      {/* RIGHT LINKS */}
      <div className="hidden md:flex gap-4 items-center justify-end flex-1">
        <div className="text-orange-900 md:absolute top-3 r-2 lg:static flex items-center gap-2 cursor-pointer bg-orange-300  px-1 rounded-md">
          <Image src="/phone.png" alt="phone Icon" width={20} height={20} />
          <span>123 456 78</span>
        </div>
        <div className="font-persian text-[16px] w-[400px] text-orange-500 font-semibold hidden lg:flex md:hidden gap-4 flex-1">
          <h1>Contact to Ketabyar Virtual bookshelf</h1>
        </div>
      </div>
    </div>
  );
};

export default Navbar;