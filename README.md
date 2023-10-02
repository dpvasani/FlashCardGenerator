
![Logo](https://www.almabetter.com/_next/image?url=https%3A%2F%2Falmablog-media.s3.ap-south-1.amazonaws.com%2FAlma_Better_Logo_4d9d929fe6.png&w=256&q=75)


# Flashcard Generator

## Introduction
Flashcard Generator website has been developed for the purpose of the creation and customisation of flashcards for multiple purposes regarding educational, professional or just for personal utility.

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)



## Features

- **Card Creation:** On the "CreateFlashCard" page, users can craft personalized flashcards by forming distinct "MainGroups" and "TermGroups." The "MainGroup" section allows the naming of the group, image upload, and description. The "TermGroup" section permits the input of term details, image selection, and dynamic addition of term groups using the "Add Term" button. The "Create Card" button generates a flashcard incorporating all provided data.
- **Display of Cards:** By transitioning to the "MyFlashCards" page, users encounter a summarized card view, showcasing the main group's particulars. This includes the group name, description, and count of associated flashcards. By clicking the "View Cards" button, users access a detailed term group view. The created flashcards can also be removed if not required anymore.
- **View, Export and Sharing:** Users can view and engage with each flashcard, leveraging the "Share," "Download," and "Print" buttons. Through the help of the react-pdf library, downloading and printing have been possible by converting the flashcard blob into pdf.
- **Responsive Design:** The project is designed to work seamlessly across various devices and screen sizes, including desktop computers, tablets, and smartphones.
- **Clean and Efficient UI / UX:** User Interface has been tailored according to the pre-determined criteria. Ensured clean UI and some out-of-the-box approach for better User Experience by conveying alert messages and framer motion animations at every step of the flashcard creation, exportation or deletion.


## Tech Stack

- React
- Tailwind CSS
- Redux Toolkit
- React-Hook-Formi
- React-pdf
- Formik
- Yup
- React Icons
## Run Locally

Clone the project

```bash
  git clone https://github.com/Leela-369/FlashCardGenerator-AlmaBetter.git
```

Go to the project directory

```bash
  cd FlashCardGenerator-Almabetter
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```


## Contributors

- Leela Santhosh [Github](https://github.com/Leela-369) | [LinkedIn](https://www.linkedin.com/in/leela-santhosh-758a56223/)

- Sathwic Raj [Github](https://www.github.com/sathwic97) | [LinkedIn](https://www.linkedin.com/in/sathwic-raj/)


## Deployed website

[website](https://flash-card-generator-alma-better-qv1d.vercel.app/)