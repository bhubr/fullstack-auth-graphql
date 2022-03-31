const mongoose = require('mongoose');

// const MovieModel = require('./models/Movie');
// const UserModel = require('./models/User');

async function main() {
  await mongoose.connect('mongodb://localhost:27017/auth_dev');
  console.log('connected');

  
}

main().catch(err => console.log(err));
