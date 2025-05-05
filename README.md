# 🌤️ ARD Task – Weather Forecast Web Application

A full-stack weather dashboard built with **NestJS**, **React**, **GraphQL**, and **Docker**. The application allows users to view current weather conditions, hourly and daily forecasts for any city using data from a third-party weather API.

---

## 🛠️ Tech Stack

| Layer     | Tech                  |
|-----------|-----------------------|
| Frontend  | React, Material UI    |
| Backend   | NestJS, GraphQL       |
| Auth      | JWT (access & refresh tokens via HTTP-only cookies) |
| API Comm. | GraphQL (optimized querying) |
| Infra     | Docker                |
| Testing   | Postman               |

---

## 📂 Project Structure 

📦 ard-task/

├── 📂 ard-backend/              
│   └── 📂 my-nest-ap/          
├── 📂 ard-frontend/             
│   └── 📂 ard-app/    

## 🚀 Features

- User signup and login with JWT-based authentication.
- Stateless session management using HTTP-only cookies.
- Real-time weather data based on user location or searched city.
- Full dashboard with current, hourly, and daily weather forecasts.
- GraphQL API to minimize frontend requests.
- Dockerized frontend and backend for easy deployment.

---

## 🔁 Application Flow

### 1. **Authentication**
- Users land on the login page.
- New users can sign up via a separate signup page.
- On successful login:
  - JWT access and refresh tokens are issued and sent as cookies.
  - User is redirected to the weather dashboard.

### 2. **Location Retrieval**
- If the user is **new**, the browser prompts for geolocation access.
- If **returning**, the last known location is fetched from the database.

### 3. **Weather Data Fetch**
- A single **GraphQL query** retrieves all required weather data.
- The backend calls a third-party weather API and returns structured weather info:
  - Current weather
  - Hourly forecast
  - Daily forecast

### 4. **Frontend Rendering**
- React dashboard receives the data and displays it via dedicated child components.

---

## 🐳 Docker Instructions

### 1. **Build Images**

#### Backend (NestJS)

```bash
cd ard-backend/my-nest-ap
docker build -t your-dockerhub-username/my-nest-backend .

cd ard-frontend/ard-app
docker build -t your-dockerhub-username/my-react-frontend .

docker run -p 8080:8080 your-dockerhub-username/my-nest-backend
docker run -p 3000:80 your-dockerhub-username/my-react-frontend
