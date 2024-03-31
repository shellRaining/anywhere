import { Travel } from '../models/travel.js';

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
