import React from 'react'
import { Link } from 'react-router-dom';
// import { GrGithub } from "react-icons/gr";

function Footer() {
  return (
    <>
      <div className="mt-8 w-full bg-black px-8 md:px-[300px] flex md:flex-row flex-col space-y-6 md:space-y-0 items-start md:justify-between text-sm md:text-md py-8 ">
        <div className="flex flex-col text-white">
          <p>Featured Blogs</p>
          <p>Most viewed</p>
          <p>New Topics</p>
        </div>

        <div className="flex flex-col text-white">
          <p>Forum</p>
          <p>Support</p>
          <p>Recent Posts</p>
        </div>

        <div className="flex flex-col text-white">
          <p>Privacy Policy</p>
          <p>About Us</p>
          <p>Terms & Conditions</p>
          <p>Terms of Service</p>
        </div>
      </div>
      <p className="py-2 pb-6 text-center text-white bg-black text-sm">Made with ❤️ by  <b className='hover:text-blue-200'><Link to="https://github.com/Prit33"> @Prit</Link></b></p>
    </>

  )
}

export default Footer