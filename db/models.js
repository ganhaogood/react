const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/gzhipin5')

const conn = mongoose.connection

conn.on('connnected', function () {
  console.log('db connect success')
})


const userSchema = mongoose.Schema({
  username: {type: String, required: true},
  password: {type: String, required: true},
  type: {type: String, required: true},
  header: {type: String},
  post: {type: String},
  info: {type: String},
  company: {type: String},
  salary: {type: String}
})

const UserModel = mongoose.model('users', userSchema)

exports.UserModel = UserModel