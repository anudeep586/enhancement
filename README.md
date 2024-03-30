Certainly! Here is the complete README content in a single, copy-pasteable format:


# API Documentation

This document provides detailed information about the API endpoints available, their functionalities, and how to interact with them.

## Base URL

All endpoints are accessible via the following base URL:
https://enhancment-zuzxy6kx2a-uc.a.run.app/v1/


## Authentication

Authentication is required for certain endpoints. Include the access token received during login or registration in the request headers as follows:
Authorization: Bearer <your_token_here>


## Endpoints

### 1. Register
- **Endpoint**: `POST /register`
- **Description**: Register a new user with the provided credentials.
- **Request Body**:
  ```json
  {
    "username": "temporary",
    "email": "temporary@gmail.com",
    "password": "temp"
  }
Response:
json
Copy code
{
  "msg": "successfully registered"
}


## Endpoints

### 2. Login

- **Endpoint:** `POST /login`
- **Description:** Login with email and password to receive an access token.
- **Request Body:**
  ```json
  {
    "email": "temporary@gmail.com",
    "password": "temp"
  }
Response:
json
Copy code
{
  "msg": "successfully verified",
  "token": "<your_access_token_here>"
}

## Endpoints

### 3. Add Profile Details

- **Endpoint:** `POST /add-profile-details`
- **Description:** Add profile details for the logged-in user.
- **Request Body:**
  ```json
  {
    "name": "anudeep",
    "bio": "nothing much",
    "phone": "+91 62389e329",
    "photo": "photo link",
    "is_public": true
  }
Response:
json
Copy code
{
  "msg": "successfully added"
}
## Endpoints

### 4. Get User Profile Details

- **Endpoint:** `GET /get-profile-details`
- **Description:** Get the profile details of the logged-in user.
- **Response:**
  ```json
  {
    "data": {
      "id": "<user_id>",
      "name": "anudeep",
      "bio": "nothing much",
      "phone": "+91 62389e329",
      "email": "anudeep@gmail.com",
      "photo": "photo link",
      "is_public": true,
      "created_at": "<timestamp>",
      "updated_at": "<timestamp>"
    }
  }

  
## Endpoints

### 5. Get All User Profile Details

- **Endpoint:** `GET /get-all-user-profile-details`
- **Description:** Get all user profiles. Admin can see all profiles; others can only see public profiles.
- **Response:**
  ```json
  {
    "data": [
      {
        "id": "<user_id>",
        "name": "anudeep",
        "bio": "nothing much",
        "phone": "+91 62389e329",
        "email": "anudeep@gmail.com",
        "photo": "photo link",
        "is_public": true,
        "created_at": "<timestamp>",
        "updated_at": "<timestamp>"
      },
      {
        "id": "<user_id>",
        "name": "temporary",
        "bio": "nothing much",
        "phone": "+91 62389e329",
        "email": "temporary@gmail.com",
        "photo": "photo link",
        "is_public": false,
        "created_at": "<timestamp>",
        "updated_at": "<timestamp>"
      }
    ]
  }


## Endpoints

### 6. Update Profile

- **Endpoint:** `PUT /update-profile`
- **Description:** Update the profile details of the logged-in user.
- **Request Body:**
  ```json
  {
    "name": "temporary",
    "bio": "nothing much",
    "phone": "+91 62389e329",
    "email": "temporary@gmail.com",
    "photo": "photo link",
    "is_public": false
  }
Response:
json
Copy code
{
  "message": "Updated successfully",
  "data": {
    "id": "<user_id>",
    "name": "temporary",
    "bio": "nothing much",
    "phone": "+91 62389e329",
    "email": "temporary@gmail.com",
    "photo": "photo link",
    "is_public": false,
    "created_at": "<timestamp>",
    "updated_at": "<timestamp>"
  }
}

## Endpoints

### 7. Login with Google

- **Endpoint:** `POST /loginThroughGoogle`
- **Description:** Login using Google credentials.
- **Request Body:**
  ```json
  {
    "email": "email@gmail.com",
    "name": "John Doe"
  }
Response:
json
Copy code
{
  "msg": "loggedin successfully",
  "token": "<your_access_token_here>"
}
