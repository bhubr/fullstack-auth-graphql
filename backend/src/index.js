const mongoose = require('mongoose');

const MovieModel = require('./models/Movie');
const UserModel = require('./models/User');

async function main() {
  await mongoose.connect('mongodb://localhost:27017/auth_dev');
  console.log('connected');

  const movie = new MovieModel({
    title: 'Avatar',
    picture: 'https://img.com/av.jpg',
    releaseYear: 2009
  })
  await movie.save();


  const user = new UserModel({
    email: 'test01@email.com',
    password: 'abc',
    role: 'user'
  })
  await user.save();

  
}

main().catch(err => console.log(err));
