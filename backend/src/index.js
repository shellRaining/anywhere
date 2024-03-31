import { connect } from 'mongoose';
import { registServerCallback } from './callback/index.js';
import express from 'express';

// create express app
const app = express();
app.listen(3000, () => {
  console.log('服务器在 localhost:3000 启动');
});

// 连接数据库
connect('mongodb://127.0.0.1:27017/travel_db')
  .then(() => {
    console.log('数据库连接成功');
    registServerCallback(app);
  })
  .catch((error) => {
    console.log('数据库连接失败', error);
  });
