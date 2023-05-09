const { Op } = require("sequelize");
const Movie = require("../models/movie");
const Cast = require("../models/cast");

exports.getAll = async (req, res) => {
  let movies;
  const { title, tag } = req.query;
  try {
    if (title && tag) {
      movies = await Movie.findAll({
        where: {
          [Op.and]: [
            { title: { [Op.iLike]: "%" + title + "%" } },
            { tags: { [Op.contains]: [tag] } },
          ],
        },
        include: Cast,
      });
    } else if (title) {
      movies = await Movie.findAll({
        where: { title: { [Op.iLike]: "%" + title + "%" } },
        include: Cast,
      });
    } else if (tag) {
      movies = await Movie.findAll({
        where: { tags: { [Op.contains]: [tag] } },
        include: Cast,
      });
    } else {
      movies = await Movie.findAll({ include: Cast });
    }

    const count = movies?.length ?? 0;
    res.status(200).json({
      movies,
      message: `Found ${count} ${count > 1 ? "movies" : "movie."}`,
    });
  } catch (err) {
    res.status(500).json({
      message: `An error occurred while fetching movies: ${err.message}`,
    });
  }
};

exports.getByTitle = async (req, res) => {
  const { title } = req.params;
  try {
    const movie = await Movie.findOne({
      where: { title: { [Op.iLike]: title } },
      include: Cast,
    });

    if (!movie) {
      return res.status(404).json({
        message: `Movie with title '${title}' cannot be found.`,
      });
    }

    res.status(200).json({
      movie,
    });
  } catch (err) {
    res.status(500).json({
      message: `An error occurred: ${err.message}`,
    });
  }
};

exports.create = async (req, res) => {
  const { title, plan, rentPeriod, rentPrice, releaseYear, posterUrl, tags } =
    req.body;
  if (!title || !plan || !rentPeriod || !rentPrice) {
    return res.status(400).json({
      message:
        "These fields are required: title, plan, rentPeriod, and rentPrice",
    });
  }

  try {
    const movie = await Movie.create({
      title,
      plan,
      rentPeriod,
      rentPrice,
      releaseYear,
      posterUrl,
      tags,
    });

    res.status(201).json({
      movie,
    });
  } catch (err) {
    res.json(500).json({
      messsage: `An error occurred while creating a movie. Error: ${err.message}`,
    });
  }
};

exports.update = async (req, res) => {
  const { id } = req.params;
  const body = req.body;

  if (!body) {
    return res.status(400).json({ message: "Request body is missing" });
  }

  try {
    const [count, movies] = await Movie.update(body, {
      where: { id },
      returning: true,
    });

    if (count === 0) {
      return res.status(404).json({
        message: `Movie with id: '${id}' cannot be found.`,
      });
    }

    res.status(200).json({
      movie: movies[0],
      message: "Successfully updated the movie.",
    });
  } catch (err) {
    res.status(500).json({
      message: `An error occurred while updating a movie: ${err.message}`,
    });
  }
};
exports.delete = async (req, res) => {
  const { id } = req.params;
  try {
    const count = await Movie.destroy({ where: { id } });
    if (count === 0) {
      return res.status(404).json({
        message: `Movie with id: '${id}' cannot be found.`,
      });
    }
    res.status(204).json({
      message: "Successfully deleted the movie.",
    });
  } catch (err) {
    res.status(500).json({
      message: `An error occurred while deleting a movie: ${err.message}`,
    });
  }
};
