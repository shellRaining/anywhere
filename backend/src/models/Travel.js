import { mongoose } from 'mongoose';

const travelSchema = new mongoose.Schema({
  title: String, // 游记的标题
  content: String, // 游记的内容
  author: String, // 作者的用户名，作为外键，对应一个唯一用户
  covers: [String], // 游记的封面图片URL
  review: {
    type: Number,
    enum: [0, 1, 2], // 游记的审核状态，0 为未审核，1 为审核通过，2 为审核未通过
    default: 0,
  },
  msg: String, // 游记审核附带信息
  delete: {
    type: Number,
    enum: [0, 1], // 游记的逻辑删除状态，0 为未删除，1 为已删除
    default: 0,
  },
  time: {
    type: Date,
    require: false, // 可选项，游记的发布时间
  },
  num_view: {
    type: Number,
    require: false, // 可选项，游记的浏览次数
  },
  num_like: {
    type: Number,
    require: false, // 可选项，游记的点赞次数
  },
  cost: {
    type: Number,
    require: false, // 可选项，游记的费用
  },
  location: {
    type: String,
    require: false, // 可选项，游记的地点
  },
});

export const Travel = mongoose.model('Travel', travelSchema);
