# Task 3: Web UI for Task Management

## 📌 Table of Contents

1. [Introduction](#-introduction)
2. [Features](#-features)
3. [System Requirements](#-system-requirements)
4. [Setup & Installation](#-setup--installation)
   - [1. Prerequisites](#1-prerequisites)
   - [2. MongoDB Setup using Compass](#2-mongodb-setup-using-compass)
   - [3. Backend Setup (Spring Boot)](#3-backend-setup-spring-boot)
   - [4. Frontend Setup (React)](#4-frontend-setup-react)
5. [Application Screenshots](#-application-screenshots)
6. [API Endpoints Used](#-api-endpoints-used)

---

## 🚀 Introduction

This is **Task 3 of the Kaiburr assignment**, where a **React 19** frontend was developed for managing and executing tasks. The UI interacts with the **Spring Boot backend** via APIs to **create, edit, delete, execute, and track tasks**.

The **main focus** of this project is to ensure:
✔ **Scalability** – Uses React 19 with TypeScript and Spring Boot with MongoDB.  
✔ **Maintainability** – Modularized structure with clean API integration.  
✔ **Usability** – Simple and accessible UI with Ant Design components.

---

## 🎯 Features

✔ **Home Page** – Overview of the application.  
✔ **Task Management** – Create, Edit, Delete, and Search tasks.  
✔ **Task Execution** – Run commands directly from the UI.  
✔ **Execution History** – Track task execution logs.  
✔ **API Communication** – Uses `axios` for efficient data handling.  
✔ **Accessibility & UX** – Designed with Ant Design for a clean UI.
✔ **Notifications** – Uses `react-toastify` for success and error messages.

---

## 💻 System Requirements

### ✅ Required Software

| Software                      | Version (or higher) | Download Link                                                           |
| ----------------------------- | ------------------- | ----------------------------------------------------------------------- |
| **Java**                      | 17+                 | [Java Official Site](https://adoptium.net/)                             |
| **Maven**                     | 3.x.x               | [Maven Official Site](https://maven.apache.org/download.cgi)            |
| **MongoDB**                   | Latest              | [MongoDB Official Site](https://www.mongodb.com/try/download/community) |
| **MongoDB Compass**           | Latest              | [MongoDB Compass](https://www.mongodb.com/try/download/compass)         |
| **Node.js**                   | 18+                 | [Node.js Official Site](https://nodejs.org/)                            |
| **npm** (comes with Node.js)  | 9+                  | Installed with Node.js                                                  |
| **Postman** (for API testing) | Latest              | [Postman](https://www.postman.com/)                                     |

---

## ⚙ Setup & Installation

### 1. Prerequisites

Ensure you have the following installed:
✅ **Java 17**  
✅ **Maven**  
✅ **MongoDB & MongoDB Compass**  
✅ **Postman**

#### Checking Java & Maven Installation

To verify Java installation, run:

```sh
java -version
```

Expected Output:

```
java version "17.0.x"
```

To verify Maven installation, run:

```sh
mvn -version
```

Expected Output:

```
Apache Maven 3.x.x
```

#### Installing MongoDB Compass

Download and install:

- **MongoDB Compass**: [Download](https://www.mongodb.com/try/download/compass)

---

### 2. MongoDB Setup using Compass

#### Step 1: Open MongoDB Compass

1. Launch **MongoDB Compass**
2. Click **"Connect"** and use the **default localhost connection (`mongodb://localhost:27017`)**

#### Step 2: Create Database & Collection

1. Click **"Create Database"**
2. Enter **Database Name:** `task_manager`
3. Enter **Collection Name:** `tasks`
4. Click **"Create Database"**

📸 **Screenshot:**  
![Create MongoDB Database](https://github.com/rohitsnair7272/kaiburr-assignment-rohit-task3/blob/master/Screenshots/MongoCreate.png?raw=true)

#### Step 3: Verify Database Creation

1. Click on `task_manager` → `tasks`
2. The collection should be empty

📸 **Screenshot:**  
![Verify MongoDB Database](https://github.com/rohitsnair7272/kaiburr-assignment-rohit-task3/blob/master/Screenshots/EmptyDatabase.png?raw=true)

---

### 3. Backend Setup (Spring Boot)

1️⃣ **Open Terminal and Navigate to Backend Directory**

```sh
cd backend-rohit
```

2️⃣ **Install Dependencies**  
Navigate to the project directory and install dependencies using Maven:

```sh
mvn clean install
```

📸 **Screenshot:**  
![Maven Install](https://github.com/rohitsnair7272/kaiburr-assignment-rohit-task3/blob/master/Screenshots/mvnInstall.png?raw=true)

3️⃣ **Run the Spring Boot Backend**

```sh
mvn spring-boot:run
```

📸 **Screenshot:**  
![Backend RUN](https://github.com/rohitsnair7272/kaiburr-assignment-rohit-task3/blob/master/Screenshots/backendRUN.png?raw=true)

This will start the backend server at **http://localhost:8080/**.

---

### 4. Frontend Setup (React)

1️⃣ **Open a New Terminal and Install Dependencies**

```sh
npm install
```

2️⃣ **Start the Development Server**

```sh
npm start
```

The frontend will run at **http://localhost:3000/** and will connect to the backend.

---

## 🖼 Application Screenshots

### 1. Home Page

Displays an overview of the task management system.  
📸 **Screenshot:**  
![Home Page](https://github.com/rohitsnair7272/kaiburr-assignment-rohit-task3/blob/master/Screenshots/HomePage.png?raw=true)

### 2. View Tasks

Lists all tasks with search functionality.  
📸 **Screenshot:**  
![View Tasks](https://github.com/rohitsnair7272/kaiburr-assignment-rohit-task3/blob/master/Screenshots/ViewTasks.png?raw=true)

### 3. Create Task

Allows users to add a new task.  
📸 **Screenshot:**  
![Create Task Form](https://github.com/rohitsnair7272/kaiburr-assignment-rohit-task3/blob/master/Screenshots/CreateTaskForm.png?raw=true)

**After Creation of Task**

📸 **Screenshot:**  
![Create Task](https://github.com/rohitsnair7272/kaiburr-assignment-rohit-task3/blob/master/Screenshots/CreateTask.png?raw=true)

### 4. Edit Task

Users can update task details.  
📸 **Screenshot:**  
![Edit Task Form](https://github.com/rohitsnair7272/kaiburr-assignment-rohit-task3/blob/master/Screenshots/EditTaskForm.png?raw=true)

**After Updation of Task**

📸 **Screenshot:**  
![Edit Task](https://github.com/rohitsnair7272/kaiburr-assignment-rohit-task3/blob/master/Screenshots/EditTask.png?raw=true)

### 5. Delete Task

Tasks can be Deleted by Pressing the Delete Button.  
📸 **Screenshot:**  
![Delete Task](https://github.com/rohitsnair7272/kaiburr-assignment-rohit-task3/blob/master/Screenshots/DeleteTask.png?raw=true)

### 6. Execute Task

Users can run a task and view real-time output in Task History.  
📸 **Screenshot:**  
![Execute Task](https://github.com/rohitsnair7272/kaiburr-assignment-rohit-task3/blob/master/Screenshots/ExecuteTask.png?raw=true)

### 7. Execution History

Displays a history of previously executed tasks with their Outputs.  
📸 **Screenshot:**  
![Task Execution History](https://github.com/rohitsnair7272/kaiburr-assignment-rohit-task3/blob/master/Screenshots/TaskHistory.png?raw=true)

---

## 🔗 API Endpoints Used

The frontend interacts with the **Spring Boot backend** using the following API endpoints:

| Method   | Endpoint                                        | Description                          |
| -------- | ----------------------------------------------- | ------------------------------------ |
| `GET`    | `/tasks`                                        | Fetch all tasks                      |
| `POST`   | `/tasks`                                        | Create a new task                    |
| `PUT`    | `/tasks/id`                                     | Edit an existing task                |
| `DELETE` | `/tasks/id`                                     | Delete a task                        |
| `PUT`    | `/tasks/id/execute`                             | Execute a task                       |
| `GET`    | `/tasks/history`                                | Retrieve task execution history      |
| `GET`    | `/search?name=${searchTerm}&type=${searchType}` | Searches/Filters Based on name or id |

---

## 🎯 Final Notes

- **Backend:** Developed using **Spring Boot (Java) with Maven**.
- **Frontend:** Built with **React 19, TypeScript, and Ant Design**.
- **Database:** Uses **MongoDB** for storing tasks and execution history.
- **API Testing Tool:** **Postman** was used for backend API testing.
