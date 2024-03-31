import { Travel } from "../models/travel.js";

export function registTravelListCallback(app) {
  app.get('/travels', async (req, res) => {
    // 请求游记列表
  })

  app.get('/travels/:username', async (req, res) => {
    // 请求某个用户的游记列表
  })
}
