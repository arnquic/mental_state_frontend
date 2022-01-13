# Tentative Name: Summit

## What your MVP looks like.
- Stores users
    - User Auth is included
- Stores user entries
    - Entries are automatically date-time stamped
    - Analysis of user entry is done upon submission
        - Analysis is stored as part of the log
- Gives some analytical feedack to the user upon analysis completion
- User Dashboard
    - User can browse previous entries (sorted by date-time)

## User stories that describe how your app will be used.
- When I first visit the site, I am greeted by a home page describing the purpose of the site and it's main features.
- When I'm not signed in, there is an option to Login, which has a further option to Create a new account.
- After logging in, I'm taken to the home page, but the navbar has new options.
- When I click on the 'New Entry' option, I'm taken to a page where I can input text and submit it to be logged.
- After clicking to submit a new entry, I'm taken to a page where I see the log, a numerical analysis, and an explanation of where the analysis grade comes from.
- When I click on the 'Dashboard" option, I'm taken to a page where I see all of my past logs and their corresponding analyses. My newest logs are at the top.

## Wireframes
See planningStuff/Wireframes.dio

## Frontend component diagram
See planningStuff/FrontendComponents.dio

## Database diagrams
See planningStuff/ERD.jpg

## Backend http routes inventory
| HTTP Verb | Route | Notes |
| --------- | ----- | -------------------------------|
| POST | /user | Create a new User |
| POST | /user/login | Login an existing User
| GET | /user/verify | Verify an existing User via the authorization token held in local storage |
| PUT | /user/update | Update user information (email and password) |
| DELETE | /user/delete | Delete user account |
| POST | /logs | Create a new Log and related Analysis, associated to the logged in user |
| GET | /logs | Retrieve all Logs that are associated to the logged in user |


## What technologies you intend on using.
- Frontend built in React with TypeScript
- Backend built in Flask with Python
    - PostgreSQL

## Your completion timeline: what you expect to get done by when
- [x] Monday: Backend completed with password hashing, user auth, and tested routes.
- [x] Tuesday: Frontend AppContext and non-page components completed.
- [x] Wednesday: Frontend completed. This day will focus on completion of page components and routing with routing error handling.
- [x] Thursday: All Final CSS - making it look pretty.

## Foreseen challenges or obstacles.
- Dealing with TypeScript types for different React components.
- Deciding how analysis is performed.

## What your stretch goals are.
- User Dashboard Extension
    - Chart of analysis 'scores' over time
    - Time-based analysis of 'scores' over time (e.g., user is currently trending down, or user has been lower than their average for > x days, etc.).
- Research additional linguistic indicators of depression and anxiety
- Research linguistic indicators of other mental diseases (e.g., schizophrenia, bi-polar, adhd)
- Add a therapist and/or psychologist association.
    - User's therapist could see user's analysis 'scores'
    - Could see entry submission frequency
    - Could see entry text

## A link to your repo!
- Frontend: https://github.com/arnquic/mental_state_frontend
- Backend: https://github.com/arnquic/mental_state_backend

## Sources
- Journal article on use of absolutist words in individuals with depression, anxienty, and suicidal ideation as compared to the general population: https://journals.sagepub.com/doi/full/10.1177/2167702617747074
- IBM Watson Tone Analyzer (might use): https://tone-analyzer-demo.ng.bluemix.net/?_ga=2.47635111.1230792974.1641835743-133657794.1641835743