const request = require("supertest");
const { sequelizeTest } = require("./config/database");
const app = require("./app");
const { movie, basicUser, premiumUser } = require("./utils/dummyData");

beforeAll(async () => {
  await sequelizeTest.sync({ force: true });
});

afterAll(async () => {
  await sequelizeTest.close();
});

describe("Rent", () => {
  it("Rent movie as a basic user", async () => {
    const user = await request(app).post("/auth/register").send(basicUser);
    expect(user.statusCode).toBe(200);
    const userId = user.body.userId;

    const responseMovie = await request(app).post("/movie").send(movie);
    expect(responseMovie.statusCode).toBe(201);
    const { id: movieId, rentPeriod, rentPrice } = responseMovie.body.movie;

    const rent = await request(app).post("/rent").send({
      movieId,
      userId,
      rentPeriod,
      rentPrice,
    });

    expect(rent.statusCode).toBe(201);
  });

  it("Rent movie as a premium user", async () => {
    const user = await request(app).post("/auth/register").send(premiumUser);
    expect(user.statusCode).toBe(200);
    const userId = user.body.userId;

    const responseMovie = await request(app).post("/movie").send(movie);
    expect(responseMovie.statusCode).toBe(201);
    const { id: movieId, rentPeriod, rentPrice } = responseMovie.body.movie;

    const rent = await request(app).post("/rent").send({
      movieId,
      userId,
      rentPeriod,
      rentPrice,
    });

    expect(rent.statusCode).toBe(202);
  });
});
