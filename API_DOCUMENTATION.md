# Movie/TV App API Documentation

## Overview

This is a NestJS backend API for a Flutter movie/TV app. The API provides endpoints for managing movies, series, people, and search functionality. All text fields are in Farsi (Persian) and responses use camelCase format.

## Base URL

```
http://localhost:3000
```

## Authentication

Currently, the API does not require authentication for read operations.

## Response Format

All responses follow this pagination format:

```json
{
  "page": 1,
  "totalResults": 100,
  "totalPages": 5,
  "results": [...]
}
```

## Endpoints

### Movies

#### GET /movies
Get a paginated list of movies.

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 20, max: 100)
- `search` (optional): Search in movie titles
- `genre` (optional): Filter by genre ID
- `year` (optional): Filter by release year
- `sortBy` (optional): Sort by `popularity`, `voteAverage`, or `releaseDate`
- `sortOrder` (optional): `asc` or `desc` (default: `desc`)

**Response:**
```json
{
  "page": 1,
  "totalResults": 50,
  "totalPages": 3,
  "results": [
    {
      "id": 1,
      "title": "شب‌های تهران",
      "description": "داستان زندگی چند جوان در تهران...",
      "releaseDate": "2023-06-15",
      "voteAverage": 8.2,
      "posterPath": "/images/movies/tehran-nights.jpg",
      "backdropPath": "/images/movies/tehran-nights-backdrop.jpg",
      "genres": [
        {
          "id": 1,
          "name": "درام"
        }
      ]
    }
  ]
}
```

#### GET /movies/:id
Get detailed information about a specific movie.

**Response:**
```json
{
  "id": 1,
  "title": "شب‌های تهران",
  "description": "داستان زندگی چند جوان در تهران...",
  "releaseDate": "2023-06-15",
  "voteAverage": 8.2,
  "posterPath": "/images/movies/tehran-nights.jpg",
  "backdropPath": "/images/movies/tehran-nights-backdrop.jpg",
  "runtime": 120,
  "status": "Released",
  "originalLanguage": "fa",
  "budget": 5000000000,
  "revenue": 15000000000,
  "voteCount": 1250,
  "createdAt": "2023-01-01T00:00:00.000Z",
  "updatedAt": "2023-01-01T00:00:00.000Z",
  "genres": [...]
}
```

#### GET /movies/:id/credits
Get cast and crew information for a movie.

**Response:**
```json
{
  "id": 1,
  "cast": [
    {
      "id": 1,
      "name": "علی رضایی",
      "character": "امیر",
      "profilePath": "/images/people/ali-rezaei.jpg"
    }
  ]
}
```

### Series

#### GET /series
Get a paginated list of series.

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 20, max: 100)
- `search` (optional): Search in series titles
- `genre` (optional): Filter by genre ID
- `year` (optional): Filter by first air year
- `sortBy` (optional): Sort by `popularity`, `voteAverage`, or `firstAirDate`
- `sortOrder` (optional): `asc` or `desc` (default: `desc`)

**Response:**
```json
{
  "page": 1,
  "totalResults": 30,
  "totalPages": 2,
  "results": [
    {
      "id": 1,
      "title": "خانواده بزرگ",
      "description": "داستان زندگی یک خانواده بزرگ...",
      "firstAirDate": "2022-09-15",
      "voteAverage": 8.5,
      "posterPath": "/images/series/big-family.jpg",
      "backdropPath": "/images/series/big-family-backdrop.jpg",
      "numberOfSeasons": 2,
      "numberOfEpisodes": 24,
      "genres": [...]
    }
  ]
}
```

#### GET /series/:id
Get detailed information about a specific series.

#### GET /series/:id/seasons
Get all seasons for a series.

**Response:**
```json
[
  {
    "id": 1,
    "seasonNumber": 1,
    "title": "فصل اول",
    "description": "شروع داستان خانواده",
    "airDate": "2022-09-15",
    "posterPath": "/images/seasons/season1.jpg",
    "episodeCount": 12,
    "episodes": [...]
  }
]
```

#### GET /series/:id/season/:seasonNumber
Get a specific season with its episodes.

**Response:**
```json
{
  "id": 1,
  "seasonNumber": 1,
  "title": "فصل اول",
  "description": "شروع داستان خانواده",
  "airDate": "2022-09-15",
  "posterPath": "/images/seasons/season1.jpg",
  "episodeCount": 12,
  "episodes": [
    {
      "id": 1,
      "episodeNumber": 1,
      "title": "شروع جدید",
      "description": "اولین قسمت از فصل اول",
      "airDate": "2022-09-15",
      "voteAverage": 8.0,
      "stillPath": "/images/episodes/ep1.jpg",
      "runtime": 45
    }
  ]
}
```

### People

#### GET /people
Get a paginated list of people.

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 20, max: 100)
- `search` (optional): Search in person names
- `sortBy` (optional): Sort by `popularity` or `name`
- `sortOrder` (optional): `asc` or `desc` (default: `desc`)

**Response:**
```json
{
  "page": 1,
  "totalResults": 100,
  "totalPages": 5,
  "results": [
    {
      "id": 1,
      "name": "علی رضایی",
      "profilePath": "/images/people/ali-rezaei.jpg",
      "popularity": 8.5
    }
  ]
}
```

#### GET /people/:id
Get detailed information about a specific person.

**Response:**
```json
{
  "id": 1,
  "name": "علی رضایی",
  "alsoKnownAs": "علی رضایی",
  "birthday": "1985-03-15",
  "placeOfBirth": "تهران، ایران",
  "profilePath": "/images/people/ali-rezaei.jpg",
  "biography": "علی رضایی یکی از بهترین بازیگران...",
  "gender": 1,
  "popularity": 8.5,
  "status": "Active",
  "createdAt": "2023-01-01T00:00:00.000Z",
  "updatedAt": "2023-01-01T00:00:00.000Z"
}
```

### Search

#### GET /search
Search across movies, series, and people.

**Query Parameters:**
- `q` (required): Search query
- `type` (optional): Filter by type (`movie`, `series`, `person`)

**Response:**
```json
[
  {
    "type": "movie",
    "results": [
      {
        "id": 1,
        "title": "شب‌های تهران",
        "description": "داستان زندگی چند جوان...",
        "releaseDate": "2023-06-15",
        "voteAverage": 8.2,
        "posterPath": "/images/movies/tehran-nights.jpg",
        "backdropPath": "/images/movies/tehran-nights-backdrop.jpg",
        "genres": [...]
      }
    ]
  },
  {
    "type": "series",
    "results": [...]
  },
  {
    "type": "person",
    "results": [...]
  }
]
```

## Error Responses

All endpoints return standard HTTP status codes:

- `200`: Success
- `400`: Bad Request
- `404`: Not Found
- `500`: Internal Server Error

Error response format:
```json
{
  "statusCode": 404,
  "message": "فیلم یافت نشد",
  "error": "Not Found"
}
```

## Database Schema

### Tables

1. **movies** - Movie information
2. **series** - Series information
3. **seasons** - Season information
4. **episodes** - Episode information
5. **people** - Person information
6. **genres** - Genre information
7. **casts** - Cast relationships
8. **movie_genres** - Movie-genre relationships
9. **series_genres** - Series-genre relationships

## Setup Instructions

1. Install dependencies:
   ```bash
   npm install
   ```

2. Configure environment variables in `.env` file:
   ```
   DB_HOST=localhost
   DB_PORT=3306
   DB_USERNAME=root
   DB_PASSWORD=your_password
   DB_DATABASE=movy_db
   ```

3. Run database migrations:
   ```bash
   npm run migration:run
   ```

4. Seed the database with sample data:
   ```bash
   npm run seed
   ```

5. Start the development server:
   ```bash
   npm run start:dev
   ```

## Swagger Documentation

Once the server is running, you can access the interactive API documentation at:

```
http://localhost:3000/api
```

## Notes

- All text fields are in Farsi (Persian)
- All JSON responses use camelCase
- Images are served from `/images/` directory
- The API is designed to work with the Flutter app without frontend changes
- Pagination is implemented for all list endpoints
- Search functionality supports multiple types
- All entities include proper relationships and foreign keys 