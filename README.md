Create simple users CRUD and events relation. On main page, need display table of all created users, table should represent all user records, with count of all events and date when next user event starting. When I click on userName in table I should see user profile page with user info and all related events. On user profile page I should be able create events for this user.
Acceptance Criteria:
When I visit main page of application then I see button "create user".
Then I click to this button and see form for creating user.
Then I fill form fields (firstName, lastName, email, phoneNumber)
Then I click save, user should be saved in DB and displayed in main page.
When I visit main page of application
Then I see table with created users and columns (UserName, Email, PhoneNumber, Events Count, Next Event Date)
Then I click to UserName in table
Then I see user profile page with button “Create Event” and table with all created events for this user.
When I visit user pofile page
Then I click ‘Create Event’ button
Then I see and fill form fields (title, description, startDate, endDate)
Then I click save, event should be saved in DB and displayed in user profile page.
When I creating event for time where I have already have other events need display validation msg - ‘You can’t create event for this time’
When I visit main page of application then I see table with all created users columns (UserName, Email, PhoneNumber, Events Count, Next Event Date)
And Events Count - all created events related to specific user record.
And Next Event Date - start date of next user event.


Requirements:
All the lists should have paginations and sorting by fields
Will be plus:
Login/Sign Up/Log Out
Technology:
JavaScript ES6+
Front-end: Vue.js.
Back-end: Node.js, MongoDB, express.js (feel free use any other libraries)
Use github for storing projects
In result we need links to project on github and project should work and ready for installing localy.
