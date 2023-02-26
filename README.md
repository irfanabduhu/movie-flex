Run postgres docker image:

```
docker run -d \
-e POSTGRES_DB=movieDB \
-e POSTGRES_USER=johndoe \
-e POSTGRES_PASSWORD=123456 \
-p 5434:5432 postgres
```

Run test db:

```
docker run -d \
-e POSTGRES_DB=testDB \
-e POSTGRES_USER=johndoe \
-e POSTGRES_PASSWORD=123456 \
-p 5435:5432 postgres
```

I have used node v16 for this project. The backend resides in the `server` directory and the frontend resides in the `client` directory. Change directory to each of them and install the dependencies with `npm i`. 

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

## Fetch data from OMDb
- `GET /fetch?t=[title]`  fetch data from OMDb with given `title`
- `GET /fetch?i=[imdbId]`  fetch data from OMDb with given `imdbId`

## Catalogue
- `GET /catalogue`  fetch all movies in the catalogue along with cast information.
- `POST /catalogue` add a movie to catalogue. Required fields: `movie`, `casts`. `movie` should contain required fields: `title`, `plan`, `rentPeriod`, `rentPrice`. `casts` should be an array of cast names.

# Client
## Routes
- Admin dashboard route: `/admin`
- Movies with filtering options: `/movies`