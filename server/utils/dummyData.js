const Chance = require("chance");
const chance = new Chance();

const movie = {
  title: "Titanic",
  releaseYear: "1997",
  posterUrl:
    "https://m.media-amazon.com/images/M/MV5BMDdmZGU3NDQtY2E5My00ZTliLWIzOTUtMTY4ZGI1YjdiNjk3XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_SX300.jpg",
  plan: "premium",
  rentPeriod: 10,
  rentPrice: "2.99",
  tags: ["Drama", "Romance"],
};

const basicUser = {
  name: "Jane Doe",
  email: "janedoe@example.com",
  password: "123456",
  plan: "basic",
};

const premiumUser = {
  name: "Keira Knightley",
  email: "keira",
  password: "123456",
  plan: "premium",
};

module.exports = {
  movie,
  basicUser,
  premiumUser,
};
