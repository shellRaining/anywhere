import { User } from '../../models/User.js';
import jsonwebtoken from 'jsonwebtoken';

// for sensitive operation, verify token first
// 1. get token and refreshToken from headers
// 2. verify token
//   1. if token is valid, continue
//   2. if token is invalid, verify refreshToken
//     1. if refreshToken is invalid, return 401, need login
//     2. if refreshToken is valid, return new token
// 3. check username in token and request params
// 4. check user exists
// 5. add new token to response header
export async function verifyToken(req, res, next) {
  try {
    const token = req.headers.authorization.replace('Bearer ', '');
    const refreshToken = req.headers['x-refresh-token'];
    let username;

    try {
      // verify access token
      const payload = jsonwebtoken.verify(token, process.env.AUTH_SECRET_KEY);
      username = payload.username;
    } catch (e) {
      try {
        const refreshPayload = jsonwebtoken.verify(refreshToken ?? '', process.env.AUTH_SECRET_KEY);
        username = refreshPayload.username;

        const newToken = jsonwebtoken.sign({ username }, process.env.AUTH_SECRET_KEY, {
          expiresIn: '15m',
        });
        res.setHeader('Authorization', 'Bearer ' + newToken);
      } catch (e) {
        res.status(401).send('请先登录以获取访问或更新凭证 ' + e.message);
        return;
      }
    }

    const reqUsername = req.params.username;
    if (username !== reqUsername) {
      res.status(403).send('无法更新其他用户信息');
      return;
    }

    const user = await User.findOne({ username });
    if (!user) {
      res.status(400).send('用户不存在');
      return;
    }

    next();
  } catch (e) {
    res.status(500).send('服务器错误 ' + e.message);
  }
}
