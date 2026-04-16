# 🗂️ Project Task Board Application

## 📌 Description

This is a full-stack task management application that allows users to create projects, manage tasks within those projects, and add comments to tasks. It helps in tracking progress, organizing work, and monitoring deadlines efficiently.

The application consists of a React frontend and an ASP.NET Core Web API backend, with data stored in a SQLite database using Entity Framework Core.

---

## 🛠️ Tech Stack

### Frontend

* React (Functional Components + Hooks)
* React Router
* Axios

### Backend

* ASP.NET Core Web API
* Entity Framework Core
* SQLite Database

---

## 🚀 Features

* Create, update, and delete projects
* Add tasks under projects
* Filter, sort, and paginate tasks
* Add and delete comments on tasks
* Dashboard with:

  * Total projects
  * Tasks by status
  * Overdue tasks
  * Upcoming tasks (next 7 days)
* Validation and error handling
* Seed data on first run

---

## ⚙️ How to Run the Application

### 🔹 Backend Setup

1. Navigate to backend project Named as solution TaskManagementBoard:

```
cd TaskManagementBoard.api
```

2. Apply database migrations:

```
dotnet ef database update
```

3. Run the API:

```
dotnet run --launch-profile https
```

---

### 🔹 Frontend Setup

1. Navigate to frontend project:

```
cd task-board-ui
```

2. Install dependencies:

```
npm install
```

3. Start the React app:

```
npm start
```

---

## 🌐 API Base URL

Make sure the frontend API base URL is correctly configured (e.g., in axios or environment file):

```
https://localhost:7065/api
```

---

## 🧪 Sample Data

The application automatically seeds sample data (projects, tasks, and comments) on first run so that the dashboard and pages display meaningful information immediately.

---

## ⚠️ Assumptions & Notes

* Priority and Status are stored as strings for simplicity.
* Basic validation is implemented using Data Annotations.
* DTOs are used in GET APIs to avoid circular references.
* Global exception middleware is implemented for clean error responses.
* UI is kept simple and functional as per assignment scope.
* No authentication/authorization is implemented.

---


## ✅ Conclusion

This project demonstrates a complete full-stack implementation with clean architecture, proper API design, and a functional React UI, meeting all core requirements of the assignment.

---
