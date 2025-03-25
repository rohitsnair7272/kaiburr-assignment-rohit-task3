# **Kaiburr Task Manager - CRUD REST API with Spring Boot & MongoDB**

**Author:** Rohit S Nair

## **Table of Contents**

1. [Project Overview](#project-overview)
2. [Tech Stack](#tech-stack)
3. [Setup & Installation](#setup--installation)
   - [1. Prerequisites](#1-prerequisites)
   - [2. Clone the Repository](#2-clone-the-repository)
   - [3. Install Dependencies](#3-install-dependencies)
   - [4. MongoDB Setup using Compass](#4-mongodb-setup-using-compass)
   - [5. Install & Setup Postman](#5-install--setup-postman)
   - [6. Run the Spring Boot Application](#6-run-the-spring-boot-application)
4. [API Endpoints & Postman Testing](#api-endpoints--postman-testing)
5. [Final Notes](#conclusion--next-steps)

---

## **Project Overview**

This is a **Task Manager REST API** built with **Spring Boot** and **MongoDB** to perform CRUD operations. It supports:  
✅ Creating, retrieving, updating, and deleting tasks  
✅ Searching tasks by name  
✅ Executing tasks  
✅ Storing execution history

---

## **Tech Stack**

- **Backend:** Spring Boot (Java)
- **Database:** MongoDB (using MongoDB Compass)
- **Build Tool:** Maven
- **API Testing Tool:** Postman

---

## **Setup & Installation**

### **1. Prerequisites**

Ensure you have the following installed:  
✅ **Java 17**  
✅ **Maven**  
✅ **MongoDB & MongoDB Compass**  
✅ **Postman**

#### **Checking Java & Maven Installation**

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

#### **Installing MongoDB Compass**

Download and install:

- **MongoDB Compass**: [Download](https://www.mongodb.com/try/download/compass)

---

### **2. Clone the Repository**

```sh
git clone https://github.com/rohitsnair7272/kaiburr-assignment-rohit-task1
cd kaiburr-assignment-rohit-task1
```

📸 **Screenshot:** ![image alt](https://github.com/rohitsnair7272/kaiburr-assignment-rohit-task1/blob/master/screenshots/cloneRepo.png?raw=true)

---

### **3. Install Dependencies**

Navigate to the project directory and install dependencies using Maven:

```sh
mvn clean install
```

📸 **Screenshot:** ![image alt](https://github.com/rohitsnair7272/kaiburr-assignment-rohit-task1/blob/master/screenshots/mvnInstall.png?raw=true)

---

### **4. MongoDB Setup using Compass**

#### **Step 1: Open MongoDB Compass**

1. Launch **MongoDB Compass**
2. Click **"Connect"** and use the **default localhost connection (`mongodb://localhost:27017`)**

#### **Step 2: Create Database & Collection**

1. Click **"Create Database"**
2. Enter **Database Name:** `task_manager`
3. Enter **Collection Name:** `tasks`
4. Click **"Create Database"**

📸 **Screenshot:** ![image alt](https://github.com/rohitsnair7272/kaiburr-assignment-rohit-task1/blob/master/screenshots/MongoCreate.png?raw=true)

#### **Step 3: Verify Database Creation**

1. Click on `task_manager` → `tasks`
2. The collection should be empty

📸 **Screenshot:** ![image alt](https://github.com/rohitsnair7272/kaiburr-assignment-rohit-task1/blob/master/screenshots/EmptyDatabase.png?raw=true)

---

### **5. Install & Setup Postman**

#### **Step 1: Download & Install Postman**

- Download Postman: [Postman Official Download](https://www.postman.com/downloads/)
- Install Postman by following on-screen instructions

#### **Step 2: Launch Postman**

- Open Postman
- Click on **"Create a new request"**
- Select **HTTP Method** (GET, POST, PUT, DELETE)
- Enter the API URL (`http://localhost:8080/tasks`)

📸 **Screenshot:** ![image alt](https://github.com/rohitsnair7272/kaiburr-assignment-rohit-task1/blob/master/screenshots/PostmanRequest.png?raw=true)

---

### **6. Run the Spring Boot Application**

1. Open a terminal in the project root folder
2. Run the application using Maven:
   ```sh
   mvn spring-boot:run
   ```
3. The API will start at `http://localhost:8080`

📸 **Screenshot:** ![image alt](https://github.com/rohitsnair7272/kaiburr-assignment-rohit-task1/blob/master/screenshots/mvnRUN.png?raw=true)

---

## **API Endpoints & Postman Testing**

### **1. Create a Task**

**Endpoint:**

```
POST /tasks
```

**Request Body (JSON):**

```json
{
  "id": "task1",
  "name": "Check Server Health",
  "owner": "Admin",
  "command": "ping -c 4 google.com"
}
```

📸 **Screenshot:** ![image alt](https://github.com/rohitsnair7272/kaiburr-assignment-rohit-task1/blob/master/screenshots/PostmanPOST.png?raw=true)

```json
{
  "id": "task2",
  "name": "This_is_Task_2",
  "owner": "Rohit",
  "command": "echo This is the Second Task"
}
```

📸 **Screenshot:** ![image alt](https://github.com/rohitsnair7272/kaiburr-assignment-rohit-task1/blob/master/screenshots/PostmanPOST2.png?raw=true)

---

### **2. Get All Tasks**

**Endpoint:**

```
GET /tasks
```

📸 **Screenshot:** ![image alt](https://github.com/rohitsnair7272/kaiburr-assignment-rohit-task1/blob/master/screenshots/PostmanGET.png?raw=true)

---

### **3. Get Task by ID**

**Endpoint:**

```
GET /tasks/task1
```

📸 **Screenshot:** ![image alt](https://github.com/rohitsnair7272/kaiburr-assignment-rohit-task1/blob/master/screenshots/PostmanGETID.png?raw=true)

---

### **4. Update a Task**

**Endpoint:**

```
PUT /tasks/task1
```

**Request Body:**

```json
{
  "name": "Updated Task Name",
  "owner": "New Owner",
  "command": "echo This is the updated command"
}
```

📸 **Screenshot:** ![image alt](https://github.com/rohitsnair7272/kaiburr-assignment-rohit-task1/blob/master/screenshots/PostmanPUT.png?raw=true)

---

### **5. Search Task by Name and Id**

**Search Task By Name Endpoint:**

```
GET /tasks/search?name=Updated Task Name&type=name
```

📸 **Screenshot:** ![image alt](https://github.com/rohitsnair7272/kaiburr-assignment-rohit-task1/blob/master/screenshots/PostmanSearchName.png?raw=true)

---

**Search Task By Id Endpoint:**

```
GET /tasks/search?name=task2&type=id
```

📸 **Screenshot:** ![image alt](https://github.com/rohitsnair7272/kaiburr-assignment-rohit-task1/blob/master/screenshots/PostmanSearchID.png?raw=true)

---

### **6. Delete a Task**

**Endpoint:**

```
DELETE /tasks/task1
```

📸 **Screenshot:** ![image alt](https://github.com/rohitsnair7272/kaiburr-assignment-rohit-task1/blob/master/screenshots/PostmanDELETE.png?raw=true)

---

### **7. Execute a Task**

**Endpoint:**

```
PUT /tasks/task2/execute
```

📸 **Screenshot:** ![image alt](https://github.com/rohitsnair7272/kaiburr-assignment-rohit-task1/blob/master/screenshots/PostmanExecute.png?raw=true)

---

### **8. Fetch Execution History**

**Endpoint:**

```
GET /tasks/history
```

📸 **Screenshot:** ![image alt](https://github.com/rohitsnair7272/kaiburr-assignment-rohit-task1/blob/master/screenshots/PostmanHistory.png?raw=true)

---

### **Testing Unsafe Commands 🚨**

This section demonstrates how the system correctly blocks unsafe commands using the validation function. Below are two test cases where the API rejects potentially harmful commands.

---

### **List of Unsafe Commands Blocked:**

📸 **Screenshot:** ![image alt](https://github.com/rohitsnair7272/kaiburr-assignment-rohit-task1/blob/master/screenshots/UnsafeCommands.png?raw=true)

---

### **❌ Example 1: Command Injection Using `&&`**

📌 **Test Input (POST request using Postman):**

```json
{
  "id": "unsafe1",
  "name": "Injection Test",
  "command": "echo 'Test' && rm -rf /"
}
```

📌 **Expected Response:**

```
{
  "Task creation failed: Unsafe command detected!"
}
```

📸 **Screenshot:** ![image alt](https://github.com/rohitsnair7272/kaiburr-assignment-rohit-task1/blob/master/screenshots/PostmanUnsafe1.png?raw=true)

---

### **❌ Example 2: Unauthorized File Access**

📌 **Test Input (POST request using Postman):**

```json
{
  "id": "unsafe2",
  "name": "Unauthorized File Access",
  "command": "chmod 777 /etc/passwd"
}
```

📌 **Expected Response:**

```
{
  "Task creation failed: Unsafe command detected!"
}
```

📸 **Screenshot:** ![image alt](https://github.com/rohitsnair7272/kaiburr-assignment-rohit-task1/blob/master/screenshots/PostmanUnsafe2.png?raw=true)

---

These tests confirm that the system effectively prevents unsafe command execution, ensuring **security and reliability**. ✅

---

## **Conclusion & Next Steps:**

This submission successfully completes Task 1 of the assignment, implementing a RESTful API for managing tasks using Spring Boot and MongoDB. The development process covered everything from setting up the backend to testing API endpoints using Postman.

Through this implementation, the following functionalities were achieved:

✅ Efficiently creating, updating, deleting, and retrieving tasks.

✅ Implementing dynamic search functionality using query parameters.

✅ Connecting and interacting with MongoDB using Spring Data.

✅ Testing REST API endpoints in real-time using Postman.

This concludes Task 1, ensuring a well-structured and fully functional API. 🚀
