import { User } from '../models/User.js';
import bcrypt from 'bcrypt';
import jsonwebtoken from 'jsonwebtoken';

export function registUserCallback(app) {
  app.post('/users/register', async (req, res) => {
    try {
      const { username = '', nickname = '', password = '' } = req.body ?? {};

      function valide() {
        if (!username || !nickname || !password) return false;
        if (password.length > 12) return false;
        return true;
      }

      if (!valide()) {
        res.status(400).send('注册信息不合法');
        return;
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({
        username,
        nickname,
        password: hashedPassword,
      });
      await user.save();
      res.status(201).send('注册成功');
    } catch (e) {
      res.status(500).send('服务器错误 ' + e.message);
    }
  });

  app.post('/users/login', async (req, res) => {
    try {
      const { username = '', password = '' } = req.body ?? {};
      const user = await User.findOne({ username }).select('password');
      if (!user) {
        res.sstatus(400).send('用户不存在');
      }
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        res.status(400).send('密码错误');
      }

      // handle jwt and sent response
      const token = jsonwebtoken.sign({ username }, process.env.AUTH_SECRET_KEY, {
        expiresIn: '1h',
      });
      res.json({ token });
    } catch (e) {
      res.status(500).send('服务器错误 ' + e.message);
    }
  });

  app.get('/users/:username', async (req, res) => {
    try {
      const { username } = req.params;
      const user = await User.findOne({ username }).select('-password');
      if (!user) {
        res.status(404).send('用户不存在');
      }
      res.json(user);
    } catch (e) {
      res.status(500).send('服务器错误 ' + e.message);
    }
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
