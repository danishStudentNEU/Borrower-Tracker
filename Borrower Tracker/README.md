# Borrow Tracker

Borrow Tracker is a React + Express-based single-page web application that helps users track items they have lent to others. Users can record item details, set due dates, mark returns, and send reminders if items are overdue — all from a clean, centered UI.

---

## What This App Does

- **Username-based Login & Registration** (no passwords)
- **Add Lend Entries**: Enter item name, borrower username, date lent, and due date
- **View All Lends**: Track outstanding and returned items
- **Mark Items as Returned**
- **Send Reminders**: If the borrower is also a user
- **Receive Reminders**: View your inbox of pending return alerts
- **See Overdue Items**: Automatically labeled if past due
- **Stateful Login via Cookie-based Session**
- **Frontend & Backend Validation + Authorization Handling**

---

## How to Use

1. **Register or Log In** with a username (e.g., `alice`, `bob`)
   -  `dog` is a banned user per project requirements
2. **Use Navigation Buttons** to:
   - View your lends
   - Add new lends
   - Check reminders
3. **Fill the Add Form** to create new lend entries
4. If the item is overdue, send a reminder to the borrower

---

## Quick Start

```bash
npm install        # install dependencies
npm run build      # build front-end using Vite
npm start          # run Express server (serves built SPA + REST APIs)


## REST API Summary
Endpoint	             Method	                        Description
/api/session	           GET	                  Get current session
/api/session	           POST	                        Login user
/api/session	          DELETE	                      Logout
/api/users	               POST	                       Register new user
/api/lends	               GET	                      List user’s lends
/api/lends	               POST	                        Add new lend
/api/lends/:id	           PATCH	              Update return or due date
/api/lends/:id	           DELETE	                    Delete lend
/api/reminders	            GET	                Fetch received reminders
/api/reminders	            POST	               Send a reminder message

### Implemented Bonus Requirements

#### Extra Service Interaction Complexity

- **Additional HTTP methods × 4**:  
  `POST`, `GET`, `PATCH`, `DELETE`  
  Implemented in: `lends.js`

- **Services with filtered data**:  
  Sending reminders only to registered users  
  Implemented in: `reminders.js`

- **Services with conditional logic (overdue check)**:  
  Reminders can only be sent if the due date has passed and the item is not returned  
  Implemented in: `LendList.jsx`

#### Extra State Complexity

- **Different "pages" managed via view state**:  
  Navigation between `My Lends`, `Add Lend`, and `Reminders`  
  Implemented in: `App.jsx`

- **Complex form validation**:  
  - All fields required in the lend form  
  - Prevents reminders to users who are not registered or to already returned items  
  Implemented in: `AddLend.jsx`, `LendList.jsx`

- **Separation of concerns**:  
  Backend services are modular and separated from frontend logic  
  Implemented in: `App.jsx`, `services.js`, `sessions.js`, `lends.js`, `reminders.js`
