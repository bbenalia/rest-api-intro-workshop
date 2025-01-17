const db = require("../models");
const { getSeedMovies } = require("./data-movie");
const { getSeedPersons } = require("./data-person");
const { getSeedUsers } = require("./data-user");

async function seedMovies() {
  // const movies = [...getSeedMovies()].map((movie) => ({ ...movie }));
  // await db.Movie.deleteMany({});
  // await db.Movie.create([...movies]);

  const movies = [...getSeedMovies()].map(async (movie) => {
    const castIds = await db.Person.find({ name: { $in: movie.cast } });
    const crewIds = await db.Person.find({ name: { $in: movie.crew } });

    const idsCs = castIds.map((castId) => castId._id);
    const idsCr = crewIds.map((crewId) => crewId._id);

    movie.cast = idsCs;
    movie.crew = idsCr;
    return movie;
  });

  const results = await Promise.all(movies);

  await db.Movie.deleteMany({});
  await db.Movie.create([...results]);
}

async function seedPersons() {
  const persons = [...getSeedPersons()].map((person) => ({ ...person }));
  await db.Person.deleteMany({});
  await db.Person.create([...persons]);
}

async function seedUsers() {
  const users = [...getSeedUsers()].map(async (user) => {
    const roleIds = await db.Role.find(
      { name: { $in: user.roles } },
      { __v: 0, name: 0 },
    );

    ids = roleIds.map((roleId) => roleId._id);
    user.roles = ids;
    return user;
  });

  const results = await Promise.all(users);

  await db.User.deleteMany({});
  await db.User.create([...results]);
}

module.exports = {
  seedMovies,
  seedPersons,
  seedUsers,
};
