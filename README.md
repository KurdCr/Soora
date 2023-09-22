
# Microservices Flashcard API (Soora Company)

This repository contains the implementation of a microservices-based Flashcard API developed with Nest.js, MongoDB, and other technologies. The API allows users to create, manage, and share flashcards, and it also includes features like user authentication, flashcard attributes, and a spaced repetition algorithm.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [API Endpoints](#api-endpoints)
- [Authentication](#authentication)
- [Flashcards](#flashcards)
- [Attributes](#attributes)
- [Spaced Repetition Algorithm](#spaced-repetition-algorithm)
- [Shareable Links](#shareable-links)

## Getting Started

### Prerequisites

Before running the Flashcard API, you need to have the following software and services installed:

- Node.js
- npm (Node Package Manager)
- MongoDB

### Installation

Follow these steps to set up and run the Flashcard API:

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/KurdCr/Soora
   ```

2. Navigate to the project directory:

   ```bash
   cd Soora
   ```

3. Install the dependencies for each microservice (api-gateway, auth-microservice, flashcard-microservice):

   ```bash
    cd api-gateway
   npm install
   
   cd ../auth-microservice
   npm install
   
   cd ../flashcard-microservice
   npm install
   ```

4. Edit the `MONGO_URI` value in the `.env` files from both the `auth-microservice` and `flashcard-microservice` directories.

5. Start the MongoDB server.

6. Run each microservice:

   ```bash
   cd api-gateway
   npm run start:dev

   cd ../auth-microservice
   npm run start:dev

   cd ../flashcard-microservice
   npm run start:dev
   ```

   The microservices should now be running locally.

7. You can use a tool like [Postman](https://www.postman.com/) to test the API endpoints.

## API Endpoints

The API endpoints are organized into several categories:

- Authentication (User sign up and sign in)
- Flashcards (Create, read, update, and delete flashcards)
- Attributes (Create, read, update, and delete attributes)
- Spaced Repetition Algorithm (Retrieve flashcards with the next review)
- Shareable Links (Generate and access shared flashcards)

For all API endpoints, requests to port 3000 get proxied to the intended microservice, as follows:

- API Gateway (Port 3000)
- Auth Microservice (Port 3001)
- Flashcards Microservice (Port 3002)
  
 For example, when you make a `GET` request to `localhost:3000/flashcards/generate-shareable-link`, it will be proxied to `GET localhost:3002/flashcards/generate-shareable-link`.

## Authentication

To access most of the API endpoints, you need to authenticate by including a valid JWT (JSON Web Token) in the `Authorization` header of your requests. You can obtain a JWT by signing up as a user and signing in.

### Sign up

- **Endpoint**: `POST /auth/signup`
- **Description**: Sign up a new user.
- **Request Body**:
  ```json
  {
    "email": "example@example.com",
    "username": "example",
    "password": "example"
  }
  ```

### Sign in

- **Endpoint**: `POST /auth/signin`
- **Description**: Sign in and get an access token in return.
- **Request Body**:
  ```json
  {
    "email": "example@example.com",
    "password": "example"
  }
  ```

## Flashcards

### Create a Flashcard

- **Endpoint**: `POST /flashcards`
- **Description**: Create a new flashcard.
- **Request Body**:
  ```json
  {
    "question": "Question",
    "answer": "Answer",
    "status": "easy"
  }
  ```
- **Authentication**: Required (JWT token).

### Get All Flashcards

- **Endpoint**: `GET /flashcards`
- **Description**: Retrieve all flashcards.
- **Authentication**: Required (JWT token).

### Get Flashcard by ID

- **Endpoint**: `GET /flashcards/:id`
- **Description**: Retrieve a specific flashcard by its ID.
- **Authentication**: Required (JWT token).

### Update Flashcard

- **Endpoint**: `PUT /flashcards/:id`
- **Description**: Update an existing flashcard.
- **Request Body**: JSON object containing the updated flashcard data (only include the fields that need updating).
  ```json
  {
    "question": "Updated Question",
    "answer": "Updated Answer",
    "status": "hard"
  }
  ```
- **Authentication**: Required (JWT token).

### Delete Flashcard

- **Endpoint**: `DELETE /flashcards/:id`
- **Description**: Delete a flashcard by its ID.
- **Authentication**: Required (JWT token).

### Associate Attributes with Flashcard

- **Endpoint**: `POST /flashcards/:flashcardId/associate-attributes`
- **Description**: Associate one or more attributes with a flashcard.
- **Request Body**:
  ```json
  {
    "attributeIds": ["attributeId1", "attributeId2"]
  }
  ```
- **Authentication**: Required (JWT token).

### Disassociate Attributes from Flashcard

- **Endpoint**: `POST /flashcards/:flashcardId/disassociate-attributes`
- **Description**: Disassociate one or more attributes from a flashcard.
- **Request Body**:
  ```json
  {
    "attributeIds": ["attributeId1", "attributeId2"]
  }
  ```
- **Authentication**: Required (JWT token).

### Get Flashcards By Attribute ID

- **Endpoint**: `GET /flashcards/attributes/:attributeId`
- **Description**: Get flashcards associated with a specific attribute.
- **Authentication**: Required (JWT token


## Attributes

### Create an Attribute

- **Endpoint**: `POST /attributes`
- **Description**: Create a new attribute.
- **Request Body**:
  ```json
  {
    "name": "Attribute Name",
    "description": "Attribute Description"
  }
  ```
- **Authentication**: Required (JWT token).

### Get All Attributes

- **Endpoint**: `GET /attributes`
- **Description**: Retrieve all attributes.
- **Authentication**: Required (JWT token).

### Get Attribute by ID

- **Endpoint**: `GET /attributes/:id`
- **Description**: Retrieve a specific attribute by its ID.
- **Authentication**: Required (JWT token).

### Update Attribute

- **Endpoint**: `PUT /attributes/:id`
- **Description**: Update an existing attribute.
- **Request Body**:
  ```json
  {
    "name": "Updated Attribute Name",
    "description": "Updated Attribute Description"
  }
  ```
- **Authentication**: Required (JWT token).

### Delete Attribute

- **Endpoint**: `DELETE /attributes/:id`
- **Description**: Delete an attribute by its ID.
- **Authentication**: Required (JWT token).

## Spaced Repetition Algorithm

### Get Visible Flashcards

- **Endpoint**: `GET /flashcards/:userId/visible`
- **Description**: Fetch flashcards scheduled for review according to the spaced repetition algorithm. `Updating` the flashcard `status` to one of the following options: ['again', 'easy', 'hard'] will render the flashcard invisible for [30, 60, 120] seconds, respectively.
- **Authentication**: Required (JWT token).

## Shareable Links

### Generate a Shareable Link

- **Endpoint**: `GET /flashcards/generate-shareable-link`
- **Description**: Generate a shareable link for a user's flashcards.
- **Authentication**: Required (JWT token).

### Accessing Shared Flashcards

- **Endpoint**: `GET /flashcards/share/:hash`
- **Description**: Access shared flashcards using a shareable link generated by a user (the URL generated by `generate-shareable-link`).
- **Authentication**: Not required.
