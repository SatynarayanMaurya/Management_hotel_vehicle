# Hotel and Vehicle Management System

This is a **MERN stack** application for managing hotels and vehicles. The platform enables admins to log in, create, update, and delete hotels or vehicles. Users can sign up, log in, and log out seamlessly, while admins can manage the details of hotels and vehicles, including their names, prices, addresses, and regions.

---

## Features

### Admin Features
- **Hotel Management**: 
  - Create a new hotel.
  - Update hotel details (name, price, address, region).
  - Delete existing hotels.
  - View all hotels.
- **Vehicle Management**: 
  - Create a new vehicle.
  - Update vehicle details (name, price, address, region).
  - Delete existing vehicles.
  - View all vehicles.

### User Features
- **Authentication**: 
  - Sign up for an account.
  - Log in to access the system.
  - Log out easily.

---

## Tech Stack
- **Frontend**: React.js with Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)

---

## Pages (Frontend Routes)
1. **/login** - Login Page.
2. **/signup** - Signup Page.
3. **/** - Home Page.
4. **/hotel** - Hotel Page.
---

## API Endpoints (Backend)

### Authentication
- `POST /signup` - Register a new user.
- `POST /login` - Log in to the system.
- `POST /logout` - Log out of the system.

### Hotel Management
- `POST /add-hotel` - Add a new hotel (Admin only).
  - **Payload**: 
    ```json
    {
      "hotelName": "Hotel ABC",
      "price": 1500,
      "address": "123 Street, City",
      "region": "North"
    }
    ```
- `PUT /update-hotel` - Update hotel details (Admin only).
- `DELETE /delete-hotel` - Delete a hotel (Admin only).
- `GET /get-all-hotels` - Get all hotels.

### Vehicle Management
- `POST /vehicles` - Add a new vehicle (Admin only).
  - **Payload**: 
    ```json
    {
      "vehicleName": "Car XYZ",
      "price": 500,
      "type": "SUV",
      "region": "East"
    }
    ```
- `PUT /add-vehicle` - Update vehicle details (Admin only).
- `DELETE /delete-vehicle` - Delete a vehicle (Admin only).
- `GET /get-all-vehicles` - Get all vehicles.

---

## Installation and Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/SatynarayanMaurya/Management_hotel_vehicle.git

2. Navigate to the project folder:
   ```bash
   cd hotel-vehicle-management
## Backend Setup
3. Navigate to the backend folder
   ```bash
   cd backend
4. Install dependencies:
    ```bash
   npm install
5. Set up your .env file:
    ```env
   MONGO_URI=your-mongodb-connection-string
    PORT = your-port-number
    JWT_SECRET=your-secret-key
6. Start the backend server:
   ```bash
     npm run start

## Frontend Setup
7. Navigate to the frontend folder:
   ```bash
   cd frontend
8. Install dependencies:
    ```bash
   npm install

9. Start the React app:
   ```bash
     npm run start



## Folder structure 
```hotel-vehicle-management/
  ├── backend/
  │   ├── controllers/
  │   ├── models/
  │   ├── routes/
  │   └── server.js
  ├── frontend/
  │   ├── src/
  │   │   ├── components/
  │   │   ├── pages/
  │   │   └── App.js
  ├── README.md
  └── package.json
