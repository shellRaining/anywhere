import { Travel } from '../models/travel.js';
import { User } from '../models/User.js';

export function registTravelListCallback(app) {
  app.get('/travels', async (req, res) => {
    // 请求游记列表
    try {
      const page = req.query.page ?? 0;
      const limit = req.query.limit ?? 0;
      const p = parseInt(page); // 从0开始
      const l = parseInt(limit);
      // 返回审核通过的游记
      const travelList = await Travel.find({ review: 1 })
        .skip(p * l)
        .limit(l)
        .select('-content');
      if (travelList.length > 0) {
        res.status(200).json(travelList);
      } else {
        res.status(404).send('未查询到指定页面');
      }
    } catch (e) {
      res.status(500).send('服务器错误' + e.message);
    }
  });

  app.get('/travels/:username', async (req, res) => {
    // 请求某个用户的游记列表
    try {
      const { username } = req.params;
      const id = await User.findOne({ username: username }).select('_id');
      if (!id) {
        res.status(404).send('用户不存在');
      } else {
        const travelList = await Travel.find({ author: username }).select('-content');
        res.json(travelList);
      }
    } catch (e) {
      res.status(500).send('服务器错误' + e.message);
    }
  });
}
