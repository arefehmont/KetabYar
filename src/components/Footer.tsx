// import Link from "next/link";
// import React from "react";

import { Link } from '@mui/material';
import { Facebook, Twitter, Instagram } from '@mui/icons-material';

const Footer = () => {
  return (
<footer className="flex justify-evenly  py-4 bg-fuchsia-50 text-rose-600">
  <p>&copy; 2024 Virtual Bookshelf. All rights reserved.</p>
  <section className="mb-4">
      <Link className='px-4 no-underline text-custom-blue' href="#" target="_blank" rel="noeferrer">
        <Facebook className="mr-2 text-custom-blue" /> Facebook
      </Link>
      <Link className='px-4 no-underline text-custom-blue' href="#" target="_blank" rel="noeferrer">
        <Twitter className="mr-2  " /> Twitter
      </Link>
      <Link className='px-4 no-underline text-custom-blue' href="#" target="_blank" rel="noeferrer">
        <Instagram className="mr-2" /> Instagram
      </Link>
    </section>
</footer>

  );
};

export default Footer;