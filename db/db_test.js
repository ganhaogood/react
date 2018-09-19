const md5=require("blueimp-md5")

const mongoose=require("mongoose")
mongoose.connect("mongodb://localhost:27017/gzhipin_test4")
const conn=mongoose.connection
conn.on("connected",function () {
  console.log("数据库连接成功")
})


const userSchema = mongoose.Schema({
  username: {type: String, required: true},
  password: {type: String, required: true},
  type: {type: String, required: true},
})
const UserModel = mongoose.model('users', userSchema)

function testSave() {
  const user = {
    username: 'quni',
    password: md5('234'),
    type: 'laoban'
  }
  new UserModel(user).save(function (error, userDoc) {
    console.log('save()', error, userDoc)
  })
}
testSave()


function testFind() {
  UserModel.find({_id: '5ba066cadcd49708989068e7'}, function (error, userDocs) {
    console.log('find()', error, userDocs)
  })
  UserModel.findOne({_id: '5ba066cadcd49708989068e7'}, function (error, userDoc) {
    console.log('findOne()', error, userDoc)
  })
}
function testUpdate() {
  UserModel.findByIdAndUpdate({_id: '5ba066cadcd49708989068e6'}, {username: 'Bob', type: 'dashen'}, function (error, oldUserDoc) {
    console.log('update()', error, oldUserDoc)
  })
}
function testRemove() {
  UserModel.remove({_id: '5ba066cadcd49708989068e6'}, function (error, doc) {
    console.log('remove()', error, doc)
  })
}
// testRemove()