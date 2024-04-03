import { User } from '../models/User.js';
import bcrypt from 'bcrypt';
import jsonwebtoken from 'jsonwebtoken';
import { verifyToken } from './lib/verify.js';

async function valideUsername(username) {
  if (!username) return false;
  const user = User.findOne({ username }).select('username');
  if (user) return false;
  return true;
}

function validePassword(password) {
  if (!password) return false;
  if (password.length > 12) return false;
  return true;
}

export function registUserCallback(app) {
  app.post('/users/register', async (req, res) => {
    try {
      const { username = '', nickname = '', password = '' } = req.body ?? {};
      if (!(await valideUsername(username))) {
        res.status(400).send('用户名不合法');
        return;
      }
      if (!validePassword(password)) {
        res.status(400).send('密码不合法');
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
        res.status(400).send('用户不存在');
      }
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        res.status(400).send('密码错误');
      }

      // handle jwt and sent response
      const token = jsonwebtoken.sign({ username }, process.env.AUTH_SECRET_KEY, {
        expiresIn: '15m',
      });
      const refreshToken = jsonwebtoken.sign({ username }, process.env.AUTH_SECRET_KEY, {
        expiresIn: '7d',
      });
      res.json({ token, refreshToken });
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

  app.put('/users/:username', verifyToken, async (req, res) => {
    try {
      const username = req.username;
      const { nickname, password } = req.body ?? {};
      if (!validePassword(password)) {
        res.status(400).send('密码不合法');
        return;
      }

      // update user database
      const hashedPassword = await bcrypt.hash(password, 10);
      const updatedUser = await User.findOneAndUpdate(
        { username },
        { nickname, password: hashedPassword },
        { new: true },
      ).select('-password');

      if (!updatedUser) {
        res.status(404).send('用户不存在');
      } else {
        res.json(updatedUser);
      }
    } catch (e) {
      res.status(500).send('服务器错误 ' + e.message);
    }
  });

  app.delete('/users/:username', verifyToken, async (req, res) => {
    try {
      const username = req.username;
      const user = await User.findOneAndDelete({ username }).select('-password');
      if (!user) {
        res.status(404).send('用户不存在');
      } else {
        res.json(user);
      }
    } catch (e) {
      res.status(500).send('服务器错误 ' + e.message);
    }
  });

  app.post('/users/avatar', async (req, res) => {
    // 上传用户头像接口
  });

  app.get('users/check', async (req, res) => {
    // 检查用户是否登录接口
  });
}
