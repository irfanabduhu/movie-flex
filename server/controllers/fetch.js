const API_KEY = "2d3dec64";
const BASE_API_URL = `http://www.omdbapi.com/?apikey=${API_KEY}&`;
const axios = require("axios");

exports.get = async (req, res) => {
  try {
    const queryName = req.query.t ? "t" : req.query.i ? "i" : "";
    if (!queryName) {
      res.status(400);
      res.json({
        message:
          "Please provide query parameter 'i' for IMDb id or 't' for title",
      });
    }

    const queryValue = req.query[queryName].split("%20").join("+");
    const { data } = await axios.get(
      `${BASE_API_URL}${queryName}=${queryValue}`
    );

    if (!data) {
      res.status(404);
      return res.json({
        message: `Movie cannot be found.`,
      });
    }

    const movie = {
      title: data.Title,
      releaseYear: data.Year,
      posterUrl: data.Poster,
      tags: data.Genre?.split(", ") ?? [],
    };

    res.status(200);
    return res.json({
      movie,
      casts: data.Actors?.split(", ") ?? [],
      message: "Successfully found the movie",
    });
  } catch (err) {
    res.status(500);
    res.json({
      message: `An error occurred while fetching movie data from OMDb. Error: ${err.message}`,
    });
  }
};
