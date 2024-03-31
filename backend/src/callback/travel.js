import { Travel } from '../models/travel.js';

const authenticate = (req, res, next) => {
  // 用来验证登录状态的中间件
  // 需要验证用户是否登录（通过 jwt）
  // jwt 是否过期
  // 是否需要刷新 jwt
  // ...
};

export function registTravelCallback(app) {
  app.get('/travel/:id', async (req, res) => {
    // 请求游记详情
  });

  app.post('/travel', async (req, res) => {
    // 发布游记
  });

  app.put('/travel/:id', async (req, res) => {
    // 修改游记
  });

  app.delete('/travel/:id', async (req, res) => {
    // 删除游记
  });

  app.put('/travel/review/:id', async (req, res) => {
    // 游记审核
  });
}
