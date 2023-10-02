import React from "react";
import { Routes, Route, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { CreateNewFlashCard } from "../components/CreateNewFlashCard";
import { MainGroup } from "../components/myflashcards_components/MainGroup";
import { TermGroup } from "../components/myflashcards_components/TermGroup";
import './flashCard.css';


const FlashCard = () => {
  // Get the current location using useLocation hook
  const location = useLocation();

  return (
    <div>
      {/* Main container */}
      <div className="flex flex-col w-4/5 sm:4/5 md:4/5 lg:3/4 p-2 mx-auto overflow-x-hidden Container">
        <h1 className="text-[18px] font-bold mb-1">Create Flashcard</h1>
        <div className="border-b border-black">
          {/* Navigation Links */}
          <nav className="my-1">
            {/* NavLink to Create New Flashcard */}
            <NavLink to="/" className="mr-6 text-sm sm:text-lg md:text-lg lg:text-lg font-semibold under-line">
              Create New
            </NavLink>
            {/* NavLink to MyFlashCards */}
            <NavLink to="/mainGroup" className=" text-sm sm:text-lg md:text-lg lg:text-lg font-semibold under-line">
              My FlashCards
            </NavLink>
          </nav>
        </div>

        <AnimatePresence>
          {/* React Router Routes */}
          <Routes location={location}>
            {/* Route for Create New Flashcard */}
            <Route
              path="/"
              element={
          /* Animated container for CreateNewFlashCard component */
                <motion.div
                  key="flashcardForm"
                  initial={{ opacity: 0, x: -100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1 }}
                >
                  <CreateNewFlashCard />
                </motion.div>
              }
            />

            {/* Route for MainGroup */}
            <Route
              path="/mainGroup"
              element={
                /* Animated container for mainGroup component */
                <motion.div
                  key="mainGroup"
                  initial={{ opacity: 0, x: -100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ type: "spring", stiffness: 20 }}
                >
                  <MainGroup />
                </motion.div>
              }
            />

            {/* Route for TermGroup */}
            <Route
              path="/termGroup/:flashcardIndex"
              element={
              /* Animated container for termGroup component */  
                <motion.div
                  key="termGroup"
                  initial={{ opacity: 0, x: -100 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1 }}
                >
                  <TermGroup />
                </motion.div>
              }
            />
          </Routes>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default FlashCard;
