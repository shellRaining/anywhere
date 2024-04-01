import { User } from '../../models/User.js';
import jsonwebtoken from 'jsonwebtoken';

export async function verifyToken(req, res, next) {
  try {
    const token = req.headers.authorization.replace('Bearer ', '');
    const { username } = jsonwebtoken.verify(token, process.env.AUTH_SECRET_KEY);
    req.username = username;

    // 403 handle
    const reqUsername = req.params.username;
    if (username !== reqUsername) {
      res.status(403).send('无法更新其他用户信息');
      return;
    }

    // 400 handle
    const user = await User.findOne({ username });
    if (!user) {
      res.status(400).send('用户不存在');
      return;
    }

    const newToken = jsonwebtoken.sign({ username }, process.env.AUTH_SECRET_KEY, {
      expiresIn: '1h',
    });
    res.setHeader('Authorization', newToken);
    next();
  } catch (e) {
    res.status(401).send('请先登录以获取访问或更新凭证 ' + e.message);
  }
}
