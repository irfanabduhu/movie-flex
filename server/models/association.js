const Movie = require("./movie");
const Cast = require("./cast");

Movie.belongsToMany(Cast, { through: "Movie_Cast" });
Cast.belongsToMany(Movie, { through: "Movie_Cast" });
