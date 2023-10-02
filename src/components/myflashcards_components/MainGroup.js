import React from 'react'
import { selectAll } from '../../features/flashCardSlice'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { deleteFlashcard } from '../../features/flashCardSlice'
import { AiFillDelete } from 'react-icons/ai'
import { motion } from 'framer-motion'




export const MainGroup = () => {
    // Get  flashcard state from the Redux store
const flashcards = useSelector((state) => selectAll(state));
 const dispatch = useDispatch()

 // State to toggle between showing all cards and a limited number of cards
const [showAllCards, setShowAllCards] = useState(false);

// State to show the delete message
const [showDeleteMessage, setshowDeleteMessage] = useState(false)
 
// Maximum number of cards to show when not in "Show All" mode
const maxVisibleCards = 6;

  // Function to toggle between showing all cards and a limited number of cards
const handleSeeAll = () => {
  setShowAllCards(!showAllCards);
};

const handleDelete = (flashcardIndex) => {
  dispatch(deleteFlashcard(flashcardIndex))
  setshowDeleteMessage(true)

  setTimeout(() => {
    setshowDeleteMessage(false)
  },1000)
}

  // Determine which flashcards to display based on "showAllCards" state
const displayedFlashcards = showAllCards ? flashcards : flashcards.slice(0, maxVisibleCards);
    
  return (
    <div>
      <div
       className='flex flex-wrap gap-3 ml-2 items-center justify-center'
       >
          {/* Display each flashcard */}
        {displayedFlashcards.map((flashcard, flashcardIndex) => (
            <div key={flashcardIndex}  className='flex flex-shrink-0'>
              <div className='flex flex-col items-center'>
                {/* Display the MainGroup Image */}
              <img src={flashcard?.mainGroup?.mainGroupImage?.mainImage} alt='' className=' w-12 h-12 rounded-full z-10 position relative top-3 shadow-md'/>
              <div className='bg-white w-72 h-48 flex flex-col space-y-2 items-center z-0'>
                {/* Display the mainGroup Name */}
                <h1 className='text-[15px] font-bold mt-8'>{flashcard?.mainGroup?.mainGroupName}</h1>
                {/* Display the mainGroup Description */}
                <p className='text-[10px] text-center max-w-[70%] max-h-4 overflow-hidden'>{flashcard?.mainGroup?.mainGroupDescription} </p>
                {/* Display the lenth of the terms the user made in the current flashcard */}
                <p className='text-[13px]'>{flashcard.termGroup.length} cards</p>
                {/* This the Link button to the TermGroup */}
                <nav>
                <Link to={`/termGroup/${flashcardIndex}`}>
              <button className='w-36 h-8 text-red-500 text-[13px] p-1 border border-red-500'>View Cards</button>
              </Link>
              </nav>
              <button className="text-gray-700 text-[13px] relative  bottom-1 cursor-pointer right-0"onClick={() => handleDelete(flashcardIndex)} > remove </button>
                  </div>
                </div>
              </div>
          ))}
          </div>
          {/* See All Button and The Logic when the see all button has to be appeared */}
              {!showAllCards && flashcards.length > maxVisibleCards && (
        <button 
         className=' text-red-500 mt-4 float-right '
        onClick={handleSeeAll}>
          See All
        </button>
      )}
      {showDeleteMessage && (
        <motion.div 
        initial={{ x: -1000 }}
        animate={{ x: 0 }}
        exit={{ x: -1000 }}
        transition={{ duration: 0.5 }}
        className='fixed left-18 sm:left-10 max-h-fit max-w-fit bottom-8 z-50 p-1 bg-red-600 text-white rounded-md drop-shadow-md'>
        <p className=' flex items-center justify-center mr-2 text-sm lg:text-lg font-bold'> <AiFillDelete className='mr-4 text-sm lg:text-lg font-bold'/> Your Card is Deleted </p>
        </motion.div>
      )}
    </div>
  )
}
