const Movie = require("./movie");
const Cast = require("./cast");
const Rent = require("./rent");
const User = require("./user");

Movie.belongsToMany(Cast, { through: "Movie_Cast" });
Cast.belongsToMany(Movie, { through: "Movie_Cast" });

Movie.belongsToMany(User, { through: Rent });
User.belongsToMany(Movie, { through: Rent });