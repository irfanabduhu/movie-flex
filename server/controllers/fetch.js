const axios = require("axios");
const OMDb_URL = `${process.env.BASE_API_URL}${process.env.API_KEY}&`;

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
    const { data } = await axios.get(`${OMDb_URL}${queryName}=${queryValue}`);

    if (data.Response === "False") {
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
