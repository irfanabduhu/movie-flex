# Setup
- Docker v23
- Node v16.19.1 (through nvm)

## Database
Create and run dev database:

```
docker run -d \
-e POSTGRES_DB=movieDB \
-e POSTGRES_USER=johndoe \
-e POSTGRES_PASSWORD=123456 \
-p 5434:5432 postgres
```

Create and run test database:

```
docker run -d \
-e POSTGRES_DB=testDB \
-e POSTGRES_USER=johndoe \
-e POSTGRES_PASSWORD=123456 \
-p 5435:5432 postgres
```

## Start the development server

The backend resides in the `server` directory and the frontend resides in the `client` directory. 

For backend:

```
cd server
npm i
npm run dev
```

For frontend:

```
cd client
npm i
npm run dev
```

# Test

To run the test suites, change into `server` directory, then run `npm test`.

# API

## CRUD on `movie`
- `GET /movie`  fetch all movies
- `GET /movie/:title`  fetch movie with the given `title`
- `POST /movie`  create a new movie. Required fields are: `title`, `plan`, `rentPeriod`, `rentPrice`
- `PUT /movie/:id`  update movie details with given `id`
- `DELETE /movie/:id`  delete the movie with given `id`.

## CRUD on `cast`
- `GET /cast`  fetch all casts
- `GET /cast/:name`  fetch cast with the given `name`
- `POST /cast`  create a new cast. The required field is: `name`
- `PUT /cast/:id`  update cast details with given `id`
- `DELETE /cast/:id`  delete the cast with given `id`.

## CRUD on `user`
- `GET /user`  fetch all users data.
- `GET /user/:id`  fetch user with the given `id`.
- `POST /user`  create a new user. Required fields: `name`, `email`, `password`, `plan`
- `PUT /user/:id`  update the user with the given `id`.
- `DELETE /user/:id`  delete the user with the given `id`.

## Fetch data from OMDb
- `GET /fetch?t=[title]`  fetch data from OMDb with given `title`
- `GET /fetch?i=[imdbId]`  fetch data from OMDb with given `imdbId`

## Catalogue
- `GET /catalogue`  fetch all movies in the catalogue along with cast information.
- `GET /basic`  fetch all movies available in the basic plan.
- `GET /premium`  fetch all movies available in the premium plan.
- `POST /catalogue` add a movie to catalogue. Required fields: `movie`, `casts`. 
  - `movie` should contain required fields: `title`, `plan`, `rentPeriod`, `rentPrice`. 
  - `casts` should be an array of cast names.

## Auth
- `POST /auth/register` register a user. Required fields: `name`, `email`, `password`, `plan`.
- `POST /auth/login`  login a user. Required fields: `email`, `password`

## Rent
- `GET /rent`  fetch all rent data.
- `GET /rent/status`  check rent status for a movie and a user. Required query parameters: `userId` and `movieId`
- `GET /rent/user/:id`  fetch all rent data of the user with id `id`.
- `GET /rent/movie/:id`  fetch all rent data of the movie with id `id`.
- `POST /rent`  create a rent. Required fields: `userId`, `movieId`, `rentPeriod`, `rentPrice`.
- `PUT /rent` update a rent. Required fields: `userId` and `movieId`.
- `DELETE /rent` delete a rent. Required fields: `userId` and `movieId`.
