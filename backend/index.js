const mongoose = require('mongoose')
const express = require('express')
const { User, Travel } = require('./dbModels')
const app = express();
// 连接数据库
mongoose.connect('mongodb://127.0.0.1:27017/travel_db');

const newUser = new User({
  username: 'tom',
  password: 'jifowneofinwoi',
  nickname: 'jioe',
  avatar: 'jifoewj',
  permission: 0
});

newUser.save()
  .then(user => console.log(user))
  .catch(err => console.error(err));

const newTravel = new Travel({
  title: 'tomTravel',
  content: 'jifoew',
  author: 'tom',
  covers: ['123', '234', '456'],
  review: 0,
  msg: 'good',
  delete: 0,
  time: new Date('2024-03-31T12:00:00'),
  num_view: 5,
  num_like: 0,
  cost: 100,
  location: 'home'
})
newTravel.save()
  .then(tra => console.log(tra))
  .catch(err => console.error(err));