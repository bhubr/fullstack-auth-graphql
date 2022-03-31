const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const MovieModel = require('../src/models/Movie');
const UserModel = require('../src/models/User');

const movies = [
  {
    title: 'Dune',
    picture:
      'https://www.themoviedb.org/t/p/w300_and_h450_bestv2/8hoD5BQuUV9dDecAbiyVIxLjzZ9.jpg',
    releaseYear: 2021,
  },
  {
    title: 'Spider-Man: No Way Home',
    picture:
      'https://www.themoviedb.org/t/p/w300_and_h450_bestv2/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg',
    releaseYear: 2021,
  },
  {
    title: 'The Batman',
    picture:
      'https://www.themoviedb.org/t/p/w300_and_h450_bestv2/74xTEgt7R36Fpooo50r9T25onhq.jpg',
    releaseYear: 2022,
  },
];

const password = bcrypt.hashSync('abcd', 11);
const users = [
  {
    email: 'admin@test.com',
    password,
    role: 'admin'
  },
  {
    email: 'user@test.com',
    password,
    role: 'user'
  }
];

async function seed() {
  await mongoose.connect('mongodb://localhost:27017/auth_dev');

  await MovieModel.insertMany(movies);
  await UserModel.insertMany(users);

  process.exit();
}

seed();
