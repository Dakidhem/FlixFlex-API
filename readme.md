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

### Create an account

To create a new account, send a POST request to `localhost:3001/api/auth/signup` with the following JSON payload:

```json
{
  "username": "mehdikadiri",
  "password": "********"
}
```

you will receive a token in the response, copy it you will need it.

Example:

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTVkMmE3YjY0ZThjODRjYjRjYmE5OTUiLCJpYXQiOjE3MDA2ODU1MDEsImV4cCI6MTcwMDY4OTEwMX0.prYQxpRnWfw06E6bPJKUe5FvTi7jduK0xGL9eHODNN0",
  "userId": "655d2a7b64e8c84cb4cba995"
}
```

### Login to your account

To login to your account, send a POST request to `localhost:3001/api/auth/login` with the following JSON payload:

```json
{
  "username": "mehdikadiri",
  "password": "********"
}
```

you will receive a token in the response, copy it you will need it.

Example:

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTVkMmE3YjY0ZThjODRjYjRjYmE5OTUiLCJpYXQiOjE3MDA2ODU1MDEsImV4cCI6MTcwMDY4OTEwMX0.prYQxpRnWfw06E6bPJKUe5FvTi7jduK0xGL9eHODNN0",
  "userId": "655d2a7b64e8c84cb4cba995"
}
```

### Get a list of movies in a batch of 10 per page

To get a list of movies in a batch of 10 per page, send a GET request to `localhost:3001/api/movies?page=<page_number>`.

```http
GET localhost:3001/api/movies?page=5
```

### Get a list of the top 5 movies/series

To get a list of the top 5 movies/series, send a GET request to `localhost:3001/api/movies/top5movies`:

```http
GET localhost:3001/api/movies/top5movies
```

### Add a movie to your favorites

To add a movie to your favorites, send a POST request to `localhost:3001/api/movies/favorites/add` with the following JSON payload:

```json
{
  "movieId": 38
}
```

### Remove a movie from your favorites

To remove a movie from your favorites, send a delete request to `localhost:3001/api/movies/favorites/remove/<movieId>`:

```http
GET localhost:3001/api/movies/favorites/remove/38
```

### View the list of your favorites movies and series

To view the list of your favorites movies and series, send a get request to `localhost:3001/api/movies/favorites`:

```http
GET localhost:3001/api/movies/favorites
```

### Search for movies and series by the name of the movie

To search for movies and series by the name of the movie, send a get request to `localhost:3001/api/movies/search?search=<query>`:

```http
GET localhost:3001/api/movies/search?search=dark
```

I can add others search option.

### View the details of a movie or series

To view the details of a movie or series, send a get request to `localhost:3001/api/movies/details/<movieId>`:

```http
GET localhost:3001/api/movies/details/38
```

### Watch the trailer of a movie or series

To watch the trailer of a movie or series, send a get request to `localhost:3001/api/movies/trailer/<movieId>` :

```http
GET localhost:3001/api/movies/trailer/38
```

you will receive this reponse :

```json
{
  "trailer": {
    "iso_639_1": "en",
    "iso_3166_1": "US",
    "name": "Eternal Sunshine of the Spotless Mind Trailer",
    "key": "rb9a00bXf-U",
    "published_at": "2011-04-13T23:58:52.000Z",
    "site": "YouTube",
    "size": 480,
    "type": "Trailer",
    "official": true,
    "id": "5af1d6140e0a26689f000232"
  }
}
```

To watch the trailer from the response, you can construct the YouTube video URL using the key property from the API response. YouTube video URLs are typically in the format https://www.youtube.com/watch?v=<key>.
