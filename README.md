# Library Web Application

Library Web Application developed as a technical test assignment for the **Red Tag Bootcamp**

---

## Tech Stack

* **Frontend:** React (with TypeScript)
* **UI Framework:** Material UI (MUI)
* **Mock Backend Database:** `json-server` (REST API simulator)

---
## 🔒 Administrative Access & Role Security

While anyone can browse the directory of books and authors, **adding, editing, or deleting entries is  restricted to logged-in Admin accounts.** To access these management features, use the default admin credentials found inside the `users` array of your initialized `db.json` file:

* **Username / Email:** `admin@library.com` *(or to check in your local db.json configurations)*
* **Password:** `admin123`

---

## Launch Commands

### 1. Project Installation
```bash
# Clone the repository
git clone git@github.com:vproshachenko/redtag-test-task.git

# Copy the environment variable configuration template
cp .env.example .env

# Initialize your local database file from the template
cp db.example.json db.json

# Install all project dependencies
npm install
```


### 2. Launching the application
```bash
# Launch database server
npx json-server --watch db.json --port 5000

# Launch react app
npm run dev
