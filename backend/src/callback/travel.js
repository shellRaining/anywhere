import { Travel } from '../models/Travel.js';
import { verifyToken } from './lib/verify.js';
import { uploadTo } from './lib/upload.js';
import { User } from '../models/User.js';
import fs from 'fs';

const upload = uploadTo('covers');

export function registTravelCallback(app) {
  app.get('/travel', async (req, res) => {
    try {
      const id = req.query.id
      const travel = await Travel.findOne({ _id: id });
      if (!travel) {
        res.status(404).send('用户不存在');
      } else {
        res.status(200).json(travel);
      }
    } catch (e) {
      res.status(500).send('服务器错误' + e.message);
    }
  });

  app.post('/travel', verifyToken, async (req, res) => {
    try {
      const { title, content } = req.body ?? {};
      if (title) {
        const newTravel = new Travel({
          title,
          content,
          author: req.username,
          time: new Date(),
          msg: '',
        });
        const savedTravel = await newTravel.save();
        res.status(200).json({ id: savedTravel._id });
      } else {
        res.status(400).send('标题为空');
      }
    } catch (e) {
      res.status(500).send('服务器错误');
    }
  });

  app.put('/travel', verifyToken, async (req, res) => {
    // 修改游记
    try {
      const { id, title, content } = req.body ?? {};
      if (title) {
        const author = await Travel.findOne({ _id: id }).select('author');
        if (author.author !== req.username) {
          res.status(403).send('无权修改他人游记');
          return;
        }
        const updatedTravel = await Travel.findOneAndUpdate(
          { _id: id },
          { title, content },
          { new: true },
        );
        if (!updatedTravel) {
          res.status(404).send('游记不存在');
        } else {
          res.status(200).send('修改成功');
        }
      } else {
        res.status(400).send('标题为空');
      }
    } catch (e) {
      res.status(500).send('服务器错误');
    }
  });

  app.delete('/travel/:id', verifyToken, async (req, res) => {
    // 删除游记
    try {
      const { id = '' } = req.body ?? {};
      const travel = await Travel.findOne({ _id: id });
      if (!travel) {
        res.status(404).send('游记不存在');
      }
      if (travel.author != req.username) {
        res.status(403).send('无权删除他人游记');
        return;
      }
      for (const path of travel.covers) {
        fs.unlink(path, (err) => {
          console.log('图片删除失败: ' + path);
        });
      }
      await Travel.deleteOne({ _id: id });
      res.status(200).send('删除成功');
    } catch (e) {
      res.status(500).send('服务器错误' + e.message);
    }
  });

  app.put('/travel/review', verifyToken, async (req, res) => {
    // 游记审核
    try {
      const { id, review, msg } = req.body ?? {};
      const user = await User.findOne({ username: req.username });
      if (user.permission === 3 || user.permission === 2) {
        const travel = await Travel.findOne({ _id: id });
        if (travel) {
          await Travel.findOneAndUpdate({ _id: id }, { review, msg });
          res.status(200).send('审核成功');
        } else {
          res.status(404).send('游记不存在');
        }
      } else {
        res.status(403).send('无权审核游记');
      }
    } catch (e) {
      res.status(500).send('服务器错误' + e.message);
    }
  });

  app.post('/travel/cover', verifyToken, upload, async (req, res) => {
    try {
      const id = req.body.id;
      const travel = await Travel.findOne({ _id: id });
      travel.covers.push(req.file.path);
      await travel.save();
      res.status(200).send('图片上传成功');
    } catch (e) {
      res.status(500).send('服务器错误' + e.message);
    }
  });

  app.get('/travel/cover', async (req, res) => {
    try {
      const id = req.query.id;
      const index = req.query.index ?? 0;
      if (!id) return res.status(400).send('参数错误');

      const travel = await Travel.findOne({ _id: id }).select('covers');
      if (!travel) {
        res.status(404).send('游记不存在');
      } else {
        const coverIndex = parseInt(index);
        if (isNaN(coverIndex) || coverIndex < 0 || coverIndex >= travel.covers.length) {
          res.status(404).send('图片下标错误');
        } else {
          res.sendFile(travel.covers[index]);
        }
      }
    } catch (e) {
      res.status(500).send('服务器错误' + e.message);
    }
  });
}
