# FlixFlex API

FlixFlex is a web application that allows users to explore movies and series. This README provides documentation for the backend API, including user authentication, movie information, favorites, and more.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
  - [User Authentication](#user-authentication)
  - [Movies](#movies)
  - [Favorites](#favorites)
  - [Search](#search)
  - [Trailers](#trailers)
- [Usage Examples](#usage-examples)
- [Contributing](#contributing)
- [License](#license)

## Getting Started

## Prerequisites

Before getting started, make sure you have the following installed on your system:

- Node.js
- npm
- Docker/docker-compose

## Installation

1. Clone this repository to your local machine:

   ```

   git clone https://github.com/Dakidhem/FlixFlex-API.git

   ```

2. Build and up the docker-compose file

   ```

   docker-compose -f docker-compose.yml build
   docker-compose -f docker-compose.yml up

   ```

## API Endpoints

### User Authentication

To create a new account, send a POST request to `localhost:3001/api/auth/signup` with the following JSON payload:

```json
{
  "username": "mehdikadiri",
  "password": "********"
}
```

To login to your account, send a POST request to `localhost:3001/api/auth/login` with the following JSON payload:

```json
{
  "username": "mehdikadiri",
  "password": "********"
}
```

### Getting a List of all Employees

To get a list of employees, send a GET request to `localhost:3001/api/a`. You can add an optional query parameter to filter employees by the date of creation:

```http
GET localhost:3001/api/employees
```

### Filter by date

To get a list of employees by a date, send a GET request to `localhost:3001/api/employees/:date`:

```http
GET localhost:3001/api/employees/2023-11-02
```

### Employee Check-In

To record an employee's check-in, send a POST request to `localhost:3001/api/times/check-in` with the following JSON payload:

```json
{
  "employeeId": "<Employee_ID>",
  "description": "Check in"
}
```

Replace `<Employee_ID>` with the employee's ID.

### Employee Check-Out

To record an employee's check-out, send a POST request to `localhost:3001/api/times/check-out` with the following JSON payload:

```json
{
  "employeeId": "<Employee_ID>",
  "description": "Check out"
}
```

Replace `<Employee_ID>` with the employee's ID.
