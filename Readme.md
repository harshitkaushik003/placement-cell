# introduction
-> career camp placement cell is a web application designed for coding ninjas skill test of the backend part
-> This web application is designed for handling students data - their information, interviews they have given and results

# starting
->please run npm install to install all the packages present in package.json

# structure
The project's directory structure is as follows ->
-> assets -> contains the css and scss files
-> config -> contains mongoose and passport configuration
-> cotrollers -> contains all the actions for the routes
-> models -> contains all the schemas required
                ->User (for authentication)
                ->Student (for student data)
                -> Interview (for interview data)
                -> Result (result of each student for each interview)
-> routes -> contains the paths or routes for the project
-> views -> contains the views 
-> index.js -> the starting point of the project 

# authentication
-> The authentication is done using passport.js
-> The session cookie is saved using mongoStore

# features
-> Adding a student 
    -> The student page gives feature to add a student using a form 
    -> The saved student will immediately be displayed on the student page
    -> Each row of the data on student page contains information of a student
    -> There is a link in every row that will take user to the information page of that student 
-> Adding an interview
    -> Similar to adding a student, an interview can be added 
    -> Each interview contains a link that redirects user to interview details page for that particular interview
    -> Details page contains the interview name, date and students 
    -> All the students are by default presnt under the heading allocate new student, since there are no students for a new interview 
    -> The students can be allocated using checkboxes and submit button. Once submitted, all the allocated students will show under allocated students
    -> The allocated students will contain two radio buttons for each student, that can be used to fill the result of pass and fail
    -> Once the result is passed, the students will be removed from the allocated students list and a new list containing results for that interview will be displayed
-> downloading csv 
    -> The student main page will contain a link - download csv
    -> when clicked the csv file will be saved

# Information on schemas
-> User
    for authentication purposes, contains fields -> 
    -> name
    -> email
    -> password
-> Student
    for students data, contains -> 
        -> name
        -> batch
        -> details (object)
            -> college
            -> status
        -> scores (object)
            -> dsa
            -> dev
            -> react
        -> interviews : array of interview refrencing to interview schema 
-> Interview
    for interview data, contains -> 
        -> company name
        -> date
        -> students: array of students refrencing to Student schema
-> Result
    for result of each student giving interviews, contains ->
        -> student: id, for the student whose result it is, refrencing to Student schema 
        -> interview: id, for the interview whose result it is, refrencing to Interview schema 
        -> result : pass/fail, result of the above student for above interview

    