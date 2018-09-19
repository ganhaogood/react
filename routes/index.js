const express = require('express');
const router = express.Router();
const md5=require("blueimp-md5")
const {UserModel}=require("../db/models")

const filter={password:0,__v:0}



router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.post("/register",function (req,res) {
  const {username,password,type}=req.body
  UserModel.findOne({username},function (error,userDoc) {
    if(error){
      console.log(error)
    }else {
      if (userDoc){
        res.send({
          "code":1,
          "msg":"不存在"
        })
      }else {
        new UserModel({username,password:md5(password),type}).save((error,userDoc)=>{
          if (error){
            console.log(error)
          } else {
            const _id=userDoc._id
            res.cookie("userid",_id)
            res.send({
              code:0,
              data:{
                _id,
                username,
                type
              }
            })
          }
        })
      }
    }
  })
})

router.post("/login",function (req,res) {
  const {username,password}=req.body
  UserModel.findOne({username,password:md5(password)},filter,function (error,userDoc) {
    if (!userDoc){
      res.send({
        "code":1,
        "msg":"错误密码"
      })
    } else {
      res.cookie("userid",userDoc._id)
      res.send({
        code:0,
        data:userDoc
      })
    }
  })

})













module.exports = router;
