const mongoose = require('mongoose')

// 用户表结构
const userSchema = new mongoose.Schema({
  username: String,   // 用户名
  password: String,   // 密码
  nickname: String,   // 昵称
  avatar: String,     // 头像URL
  permission: {       // 权限，0 为游客，1 为用户，2 为审核人员，3 为管理员
    type: Number,
    enum: [0, 1, 2, 3],
    default: 0
  }
});

// 游记表结构
const travelSchema = new mongoose.Schema({
  title: String,      // 游记的标题
  content: String,    // 游记的内容
  author: String,	    // 作者的用户名，作为外键，对应一个唯一用户
  covers: [String],   // 游记的封面图片URL
  review: {           // 游记的审核状态，0 为未审核，1 为审核通过，2 为审核未通过
    type: Number,
    enum: [0, 1, 2],
    default: 0
  },
  msg: String,        // 游记审核附带信息
  delete: {           // 游记的逻辑删除状态，0 为未删除，1 为已删除
    type: Number,
    enum: [0, 1],
    default: 0
  },
  time: {	            // 可选项，游记的发布时间
    type: Date,
    require: false // 可选
  },
  num_view: {	        // 可选项，游记的浏览次数
    type: Number,
    require: false
  },
  num_like: {	        // 可选项，游记的点赞次数
    type: Number,
    require: false
  },
  cost: {	            // 可选项，游记的花费
    type: Number,
    require: false
  },
  location: {         // 可选项，游记的地点
    type: String,
    require: false
  }
});

const User = mongoose.model('User', userSchema);
const Travel = mongoose.model('Travel', travelSchema);
module.exports = {
  User,
  Travel
};