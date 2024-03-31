import { User } from '../models/User.js';

export function registUserCallback(app) {
  app.post('/users/register', async (req, res) => {
    // 用户注册接口
  });

  app.post('/users/login', async (req, res) => {
    // 用户登录接口
  });

  app.get('/users/:username', async (req, res) => {
    // 获取用户信息接口
  });

  app.put('/users/:username', async (req, res) => {
    // 修改用户信息接口
  });

  app.delete('/users/:username', async (req, res) => {
    // 删除用户接口
  });

  app.post('/users/avatar', async (req, res) => {
    // 上传用户头像接口
  });

  app.get('users/check', async (req, res) => {
    // 检查用户是否登录接口
  });
}
