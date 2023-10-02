// Importing required dependencies and components
import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { addFlashcard } from "../features/flashCardSlice";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { useFormik } from "formik";
import schema from "../validation/schema";
import AutosizeTextarea from "react-textarea-autosize";
import { motion, AnimatePresence } from "framer-motion";
import { FaFileUpload } from "react-icons/fa";
import { GiPartyPopper } from 'react-icons/gi'



export const CreateNewFlashCard = ({ flashcard = {} }) => {
  // Redux dispatch to add flashcards
  const dispatch = useDispatch();

  // Initial values for mainGroup and termGroup  defaults
  const initialMainGroup =
    flashcard && flashcard.mainGroup
      ? flashcard.mainGroup
      : {
          mainGroupName: "",
          mainGroupImage: null,
          mainGroupDescription: "",
        };
  const initialTermGroup =
    flashcard && flashcard.termGroup
      ? flashcard.termGroup
      : [
        
          {
            termGroupName: "",
            termGroupDescription: "",
            termGroupImage: null,
          },
        ];

  // Ref used to focus the cursor to inputs for term name
  const termNameInputRefs = useRef([]);
  
  //State  show's the message when the flash card is created
   const [showMessage, setShowMessage] = useState(false)

  // State to track whether main group image is uploaded
  const [isMainGroupImageUploaded, setIsMainGroupImageUploaded] = useState(
    false
  );

  // State to track whether term images are uploaded (array with initialTermGroup.length elements, all set to false initially
  const [isTermImageUploaded, setIsTermImageUploaded] = useState(
    Array(initialTermGroup.length).fill(false)
  );

  // Function to handle changes to mainGroup fields
  const handleMainChange = (field, value) => {
    formik.setFieldValue(`mainGroup.${field}`, value);
  };

  // Function to handle changes to termGroup fields
  const handleTermChange = (index, field, value) => {
    const updatedTermGroup = formik.values.termGroup.map((termGroup, i) => {
      if (i === index) {
        return { ...termGroup, [field]: value };
      }
      return termGroup;
    });
    formik.setFieldValue("termGroup", updatedTermGroup);
  };

  // Function to handle changes to term images
const handleTermImageChange = (index, imageFile) => {
  const reader = new FileReader();
  reader.onload = () => {
    const termGroupImage = {
      name: imageFile.name,
      termImageURL: URL.createObjectURL(imageFile),
      termImage: reader.result,
    };
    formik.setFieldValue(`termGroup[${index}].termGroupImage`, termGroupImage);

    const updatedIsTermImageUploaded = [...isTermImageUploaded];
    updatedIsTermImageUploaded[index] = true;
    setIsTermImageUploaded(updatedIsTermImageUploaded);
  };
  reader.readAsDataURL(imageFile);
};


  // Function to handle changes to main group image
  const handleMainImageChange = (imageFile) => {
    const reader = new FileReader()
    reader.onload = () => {
    const mainGroupImage = {
      name: imageFile.name,
      mainImageURL: URL.createObjectURL(imageFile),
      mainImage: reader.result,
    };
    formik.setFieldValue("mainGroup.mainGroupImage", mainGroupImage);
    setIsMainGroupImageUploaded(true);
  }
  reader.readAsDataURL(imageFile)
  };

  // Function to add a new term field to the form
  const addTermField = () => {
    formik.setFieldValue("termGroup", [
      ...formik.values.termGroup,
      {  termGroupName: "", termGroupDescription: "", termGroupImage: "" },
    ]);
  };

  // Function to remove a term field from the form (except the first one, as it should always be there
  const removeTermField = (index) => {
    if (index === 0) {
      return;
    }
    const updatedTermGroup = formik.values.termGroup.filter((_, i) => i !== index);
    formik.setFieldValue("termGroup", updatedTermGroup);
  };

  // Function to handle form submission
  const handleSubmit = (values, { resetForm }) => {
    // Create an updated flashcard object with mainGroup and termGroup values
    const updatedFlashcard = {
      ...flashcard,
      mainGroup: values.mainGroup,
      termGroup: values.termGroup,
    };

    // Dispatch action to add the flashcard
    dispatch(addFlashcard(updatedFlashcard));

    // Reset the form and other related states
    resetForm();
    setIsMainGroupImageUploaded(false);
    setIsTermImageUploaded(Array(initialTermGroup.length).fill(false));

     setShowMessage(true)

     setTimeout(() => {
       setShowMessage(false);
     }, 2000);

  };

  // Function to set focus to the term name input field of a specific index
  const setEditingIndexAndFocus = (index) => {
    termNameInputRefs.current[index]?.focus();
  };

  // useFormik hook to handle form values, validation, and submission
  const formik = useFormik({
    initialValues: {
      mainGroup: initialMainGroup,
      termGroup: initialTermGroup,
    },
    validationSchema: schema,
    onSubmit: handleSubmit,
  });

    
  return (
    // Form containing inputs for mainGroup, termGroup, and other features, and a submit button
    <form onSubmit={formik.handleSubmit}>
      <div className="mt-3 h-auto w-full z-0">
        {/* Main Group Section */}
        <div className="bg-white p-4">
          <div className="flex">
            <div className="w-2/3 sm:w-1/2  mr-4">
              {/* Input for Main Group Name */}
              <p className="text-[13px] font-bold mb-2">Group Name</p>
              <input
                id="mainGroupName"
                placeholder="Please Enter Group Name"
                name="mainGroupName"
                type="text"
                className="px-3 py-2 border outline-gray-200 border-gray-400 h-9 w-full text-10px"
                onChange={(event) =>
                  handleMainChange("mainGroupName", event.target.value)
                }
                onBlur={formik.handleBlur}
                value={formik.values?.mainGroup?.mainGroupName}
              />
              {formik.touched.mainGroup?.mainGroupName &&
                formik.errors.mainGroup?.mainGroupName && (
                  // Formik Error Message for Main Group Name
                  <div className="text-red-600 text-[10px]">
                    {formik.errors.mainGroup.mainGroupName}
                  </div>
                )}
            </div>
            <div>
            <div className="flex w-2/3 sm:w-28 mt-4 items-center">
              {/* Conditional Rendering for Main Group Image */}
              {isMainGroupImageUploaded ? (
                <img
                  src={formik.values.mainGroup.mainGroupImage.mainImage}
                  alt="Main Group"
                  className="w-44 h-14"
                />
              ) : (
                // File input for uploading Main Group Image
                <label className="flex items-center justify-between mt-4 p-1 border border-gray-400 text-blue-600 text-[10px] sm:text-[13px] cursor-pointer rounded-md w-auto">
                  <span className="flex items-center justify-between gap-1 "> <FaFileUpload className="text-blue-600"/> <span>Upload Image</span></span>
                  <input
                  required
                    hidden
                    id="mainGroupImage"
                    name="mainGroupImage"
                    type="file"
                    accept="image/*"
                    onChange={(event) => handleMainImageChange(event.target.files[0])}
                    onBlur={formik.handleBlur}
                  />
                </label>
              )}
            </div>
            {formik.touched.mainGroup?.mainGroupImage &&
                formik.errors.mainGroup?.mainGroupImage && (
                  // Formik Error Message for Main Group Image
                  <div className="text-red-600 text-[10px]">
                    {formik.errors.mainGroup.mainGroupImage}
                  </div>
                )}
            </div>
          </div>
          <div className="mt-2 w-3/4">
            {/* Input for Main Group Description */}
            <p className="font-bold text-[13px] mb-2">Description</p>
            <textarea
              id="mainGroupDescription"
              placeholder="Please Enter Group Description"
              name="mainGroupDescription"
              className="px-3 py-2 border outline-gray-200 border-gray-400 h-20 w-full text-[13px]"
              onChange={(event) =>
                handleMainChange("mainGroupDescription", event.target.value)
              }
              onBlur={formik.handleBlur}
              value={formik.values.mainGroup.mainGroupDescription}
            />
            {formik.touched.mainGroup?.mainGroupDescription &&
              formik.errors.mainGroup?.mainGroupDescription && (
                // Formik Error Message for Main Group Description
                <div className="text-red-600 text-[10px]">
                  {formik.errors.mainGroup.mainGroupDescription}
                </div>
              )}
          </div>
        </div>

        {/* Term Group Section */}
        <div className="mt-3 bg-white w-full px-3 py-3">
          {/* AnimatePresence is used to animate the presence of elements when they are added or removed */}
          <AnimatePresence>
            {/* Using map to loop through each term in termGroup */}
            {formik.values.termGroup.map((termGroup, index) => (
              // motion.div from Framer Motion provides animation capabilities
              <motion.div
                key={index}
                className="flex flex-col sm:flex-row h-auto space-y-1 sm:space-y-0  sm:space-x-2 mb-5"
                // initial, animate, and exit properties define the animation behavior
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.5 }}
              >
                <div className="w-8 sm:w-16 h-8 mt-7 flex items-center justify-center bg-rose-400 rounded-full text-white text-[14px] font-bold">
                  {/* Display Term Index */}
                  {index + 1}
                </div>
                  
                <div className="w-5/6">
                  {/* Input for Term Name */}
                  <label
                    htmlFor={`termGroup[${index}].termGroupName`}
                    className="text-[13px] font-bold "
                  >
                    Enter Term
                  </label>
                  <input
                    id={`termGroup[${index}].termGroupName`}
                    name={`termGroup[${index}].termGroupName`}
                    type="text"
                    placeholder="Please Enter Term Name"
                    onChange={(event) =>
                      handleTermChange(index, "termGroupName", event.target.value)
                    }
                    onBlur={formik.handleBlur}
                    className="px-3 py-2 border h-9 w-full text-[13px] mt-1 outline-gray-200 border-gray-400"
                    value={formik.values.termGroup[index].termGroupName}
                    ref={(ref) => (termNameInputRefs.current[index] = ref)}
                  />
                  {formik.touched.termGroup?.[index]?.termGroupName &&
                    formik.errors.termGroup?.[index]?.termGroupName && (
                      // Formik Error Message for Term Name
                      <div className="text-red-600 text-[10px] mt-1">
                        {formik.errors.termGroup[index].termGroupName}
                      </div>
                    )}
                </div>
                <div className="w-5/6">
                  {/* Input for Term Description */}
                  <label
                    htmlFor={`termGroup[${index}].termGroupDescription`}
                    className="text-[13px] font-bold"
                  >
                    Enter Definition
                  </label>
                  <AutosizeTextarea
                    minRows={1}
                    maxRows={3}
                    placeholder="Please Enter Term Definition"
                    id={`termGroup[${index}].termGroupDescription`}
                    name={`termGroup[${index}].termGroupDescription`}
                    className="px-3 py-2 border outline-gray-200 rounded-sm border-gray-400 w-full text-[13px] mt-1 "
                    onChange={(event) =>
                      handleTermChange(index, "termGroupDescription", event.target.value)
                    }
                    onBlur={formik.handleBlur}
                    value={formik.values.termGroup[index].termGroupDescription}
                  />
                  {formik.touched.termGroup?.[index]?.termGroupDescription &&
                    formik.errors.termGroup?.[index]?.termGroupDescription && (
                      // Formik Error Message for Term Description
                      <div className="text-red-600 text-[10px]">
                        {formik.errors.termGroup[index].termGroupDescription}
                      </div>
                    )}
                </div>
                <div>
                <div className=" w-28 flex items-center">
                  {/* Conditional Rendering for Term Image */}
                  {isTermImageUploaded[index] ? (
                    <img
                      src={formik.values.termGroup[index].termGroupImage.termImageURL}
                      alt={`Term ${index + 1}`}
                      className=" mt-1 sm:mt-4 w-26 h-14"
                    />
                  ) : (
                    // File input for uploading Term Image
                    <label className="flex items-center mt-2 sm:mt-7 p-2 border border-blue-400 text-blue-500 text-[10px] cursor-pointer rounded-md mb-2 sm:mb-0">
                      <span>Select Image</span>
                      <input required
                        hidden
                        id={`termGroup[${index}].termGroupImage`}
                        name={`termGroup[${index}].termGroupImage`}
                        type="file"
                        accept="image/*"
                        onChange={(event) => handleTermImageChange(index, event.target.files[0])}
                      />
                    </label>
                  )}
                </div>
                {formik.touched.termGroup?.[index]?.termGroupImage &&
                    formik.errors.termGroup?.[index]?.termGroupImage && (
                      // Formik Error Message for Term Image
                      <div className="text-red-600 text-[10px] mt-1">
                        {formik.errors.termGroup[index].termGroupImage}
                      </div>
                    )}
                    </div>
                {formik.values.termGroup[index].termGroupName && (
                  <div className="flex flex-row sm:flex-col space-x-2 sm:space-x-0 sm:mt-0 sm:space-y-2">
                    {/* Delete Term Button */}
                    <button
                      type="button"
                      onClick={() => removeTermField(index)}
                      className="text-gray-400 text-[18px] sm:mt-7 font-bold"
                    >
                      <AiOutlineDelete/>
                    </button>
                    {/* Edit Term Button */}
                    <button
                      type="button"
                      onClick={() => setEditingIndexAndFocus(index)}
                      className="text-blue-500 text-[18px] font-bold"
                    >
                      <AiOutlineEdit />
                    </button>
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
          <div className="mt-10">
            {/* Add Term Button */}
            <button
              type="button"
              onClick={addTermField}
              className="text-blue-500 text-[13px]"
            >
              +Add Term
            </button>
          </div>
        </div>

        <div className="flex justify-center mt-10 mb-7">
          {/* Submit Button */}
          <button
            type="button"
            onClick={formik.handleSubmit}
            className="py-2 bg-red-600 w-48 text-white text-[13px] rounded"
          >
            Create Card
          </button>
        </div>
       
          </div>
          {showMessage && (
        
        <motion.div 
        initial={{ x: -1000 }}
        animate={{ x: 0 }}
        exit={{ x: -1000 }}
        transition={{ duration: 0.5 }}
        className="fixed flex left-8  sm:z-10 inset-0 top-[90%] p-6 bg-green-600 rounded drop-shadow-lg max-w-fit max-h-5">
          
          <p className="flex items-center justify-center text-white text-sm font-bold gap-1"> <span>  Your flashcard has been created </span> <GiPartyPopper/> <GiPartyPopper/>  </p>
        </motion.div>
     
      )}
    </form>
  );
};

