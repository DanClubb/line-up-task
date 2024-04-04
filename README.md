# Project setup

First open a terminal and make sure you are in the project directory

Next run **_"npm install"_** (or the equivilent command for an alternative package manager) to install all the dependencies locally

# Run project locally

Inside the terminal run **_"npm run dev"_** (or the equivilent) and navigate to the url that is displayed in the terminal (likely to be http://localhost:5173/)

All other scripts can be found in the package.json

# My decisions

## Tech used

-   React
-   CSS
-   Jest / React Testing Library (Although the tests are broken in this repo and I haven't managed to find a fix yet)
-   Vite

## Main objectives

I wanted a clear and easy way to view the users and their details.  
I wanted to use the url to hold some state.  
I wanted the app to be useable on different screen sizes.

I decided to have both the list of users and the specific user details on the same page, this was to make the design look a bit fuller as well as making it easier for users to quickly move from one user to another.

## Challenges / Things I would've changed with more time

-   Fix the testing issue and write some more tests.
-   refactor some code, in particular I felt I was using the parseInt method quite a lot.
