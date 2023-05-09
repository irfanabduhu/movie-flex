const { cast } = require("sequelize");
const { sequelize, sequelizeTest } = require("../config/database");

const Cast = require("../models/cast");
const Movie = require("../models/movie");

const db = process.env.NODE_ENV === "test" ? sequelizeTest : sequelize;

const Movie_Cast = db.models["Movie_Cast"];

exports.getBasic = async (req, res) => {
  try {
    const movies = await Movie.findAll({
      where: { plan: "basic" },
      include: Cast,
    });
    const count = movies?.length ?? 0;

    res.status(200);
    res.json({
      movies,
      message: `Found ${count} ${count > 1 ? "movies" : "movie."}`,
    });
  } catch (err) {
    res.status(500);
    res.json({
      message: `An error occurred while fetching movies: ${err.message}`,
    });
  }
};

exports.getAll = async (req, res) => {
  try {
    const movies = await Movie.findAll({ include: Cast });
    const count = movies?.length ?? 0;

    res.status(200);
    res.json({
      movies,
      message: `Found ${count} ${count > 1 ? "movies" : "movie."}`,
    });
  } catch (err) {
    res.status(500);
    res.json({
      message: `An error occurred while fetching movies: ${err.message}`,
    });
  }
};

exports.add = async (req, res) => {
  const { movie, casts } = req.body;

  if (!movie) {
    res.status(400);
    return res.json({
      message: "The request body should have a 'movie' field.",
    });
  }
  if (!casts) {
    res.status(400);
    return res.json({
      message: "The request body should have a 'casts' field.",
    });
  }

  try {
    const responseMovie = await Movie.create({
      title: movie.title,
      plan: movie.plan,
      rentPeriod: movie.rentPeriod,
      rentPrice: movie.rentPrice,
      releaseYear: movie.releaseYear,
      posterUrl: movie.posterUrl,
      tags: movie.tags,
    });
    const responseCasts = await Promise.all(
      casts?.map((cast) => Cast.upsert({ name: cast }))
    );
    await Promise.all(
      responseCasts?.map(([cast, _]) =>
        Movie_Cast.create({ MovieId: responseMovie.id, CastId: cast.id })
      )
    );
    res.status(201);
    res.json({
      message: `Movie ${movie.title} has been successfully added to catalogue`,
    });
  } catch (err) {
    res.status(500);
    res.json({
      message: `An error occurred while adding movie to database: ${err.message}`,
    });
  }
};
