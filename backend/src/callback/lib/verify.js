import { User } from '../../models/User.js';
import jsonwebtoken from 'jsonwebtoken';

// for sensitive operation, verify token first
// 1. get token and refreshToken from headers
// 2. verify token
//   1. if token is valid, continue
//   2. if token is invalid, verify refreshToken
//     1. if refreshToken is invalid, return 401, need login
//     2. if refreshToken is valid, return new token
// 3. add new token to response header
export async function verifyToken(req, res, next) {
  try {
    const token = req.headers.authorization.replace('Bearer ', '');
    const refreshToken = req.headers['x-refresh-token'].replace('Bearer ', '');
    let username;

    try {
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
    req.username = username;
    next();
  } catch (e) {
    res.status(500).send('服务器错误 ' + e.message);
  }
}

// this middleware need called after verifyToken
// 1. get username from request, compare with request params, if not equal, return 403
// 2. get user from database, if not exist, return 400
export async function verifyUser(req, res, next) {
  const reqUsername = req.params.username;
  const username = req.username;
  if (username !== reqUsername) return res.status(403).send('无法更新其他用户信息');

  const user = await User.findOne({ username });
  if (!user) return res.status(400).send('用户不存在');

  next();
}
