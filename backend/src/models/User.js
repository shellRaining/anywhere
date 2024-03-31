import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: String, // 用户名
  password: String, // 密码
  nickname: String, // 昵称
  avatar: String, // 头像URL
  permission: {
    // 权限，0 为游客，1 为用户，2 为审核人员，3 为管理员
    type: Number,
    enum: [0, 1, 2, 3],
    default: 0,
  },
});

export const User = mongoose.model('User', userSchema);
