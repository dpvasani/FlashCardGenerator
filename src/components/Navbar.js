import React from "react";
import AlmaBetterLogo from '../assets/logo.png'
// Importing the image file 'Almabetterlogo.png' from the '../assets' directory


const Navbar = () => {
  return (
    
      <div className="flex items-center justify-between bg-white p-2 shadow-lg">
        {/* Displaying the Almabetter logo image */}
        <img
          src={AlmaBetterLogo}
          alt="AlmaBetter logo"
          className="w-18 h-5 sm:w-22 sm:h-6 sm:ml-3 "
        />
        {/* Displaying the title of the Navbar */}
        <h1 className="text-sm sm:block sm:text-lg md:text-xl lg:text-xl sm:mr-5 font-bold">Flash Card Generator</h1>
      </div>
      
    
  );
};

export default Navbar;
