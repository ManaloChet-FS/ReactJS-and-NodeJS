const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../index");
const { MongoMemoryServer } = require("mongodb-memory-server");
const Game = require("../models/Games");

let mongoServer;

// Before the tests, creates a mock mongodb database in memory
beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);

  // Default data
  const games = [
    {
      name: "Counter-Strike 2",
      releaseDate: "9/27/2023",
      genre: "Shooter",
      averageScore: 9,
      studio: "66c213d3a70fc8d805885dc7",
    },
    {
      name: "Left 4 Dead",
      releaseDate: "11/17/2008",
      genre: "Shooter",
      averageScore: 10,
      studio: "66c213d3a70fc8d805885dc7",
    },
    {
      name: "Dishonored",
      releaseDate: "10/8/2012",
      genre: "Stealth",
      averageScore: 9,
      studio: "66c3348d650e0affa307af52",
    },
    {
      name: "Elden Ring",
      releaseDate: "2/25/2022",
      genre: "Adventure",
      averageScore: 9,
      studio: "66c913b813d9b0f9ab27bcac",
    },
    {
      name: "TESTGAME",
      releaseDate: "5/2/2021",
      genre: "Adventure",
      averageScore: 4,
      studio: "66c3348d650e0affa307af52"
    },
  ];

  await Game.insertMany(games);
});

// After the tests, deletes the mock database.
afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoServer.stop();
});

describe("Query string and select tests", () => {
  test("Query string of name=Left 4 Dead", async () => {
    const result = await request(app).get("/api/v1/games?name=Left 4 Dead");
    const { data } = result.body;
    expect(data[0].name).toEqual("Left 4 Dead");
  });

  test("Select test of name and averageScore", async () => {
    const result = await request(app).get(
      "/api/v1/games?select=name,averageScore"
    );
    const { data } = result.body;

    expect(data[0]).toHaveProperty("name");
    expect(data[0]).toHaveProperty("averageScore");
    expect(data[0]).not.toHaveProperty("releaseDate");
    expect(data[0]).not.toHaveProperty("genre");
    expect(data[0]).not.toHaveProperty("studio");
    expect(data[0]).not.toHaveProperty("createdAt");
    expect(data[0]).not.toHaveProperty("updatedAt");
  });
});

describe("Pagination tests", () => {
  test("Skip test", async () => {
    const result = await request(app).get("/api/v1/games?page=2&limit=3");
    const { data } = result.body;

    expect(data[0].name).toEqual("Elden Ring");
  })

  test("Limit test", async () => {
    const result = await request(app).get("/api/v1/games?limit=3");
    const { data } = result.body;

    expect(data.length).toEqual(3);
  });
});

describe("Sort tests", () => {
  test("Average score ascending test", async () => {
    const result = await request(app).get(
      "/api/v1/games?sort=averageScore&limit=5"
    );
    const { data } = result.body;

    const games = Object.values(data);
    let scores = [];
    games.forEach((game) => scores.push(game.averageScore));

    const lowestScore = Math.min(...scores);
    const highestScore = Math.max(...scores);

    expect(data[0].averageScore).toEqual(lowestScore);
    expect(data[4].averageScore).toEqual(highestScore);
  });

  test("Average score descending test", async () => {
    const result = await request(app).get(
      "/api/v1/games?sort=-averageScore&limit=5"
    );
    const { data } = result.body;

    const games = Object.values(data);
    let scores = [];
    games.forEach((game) => scores.push(game.averageScore));

    const lowestScore = Math.min(...scores);
    const highestScore = Math.max(...scores);

    expect(data[0].averageScore).toEqual(highestScore);
    expect(data[4].averageScore).toEqual(lowestScore);
  });
});
