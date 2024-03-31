import { registTravelCallback } from './travel.js';
import { registTravelListCallback } from './travelList.js';
import { registUserCallback } from './user.js';

export function registServerCallback(app) {
  registUserCallback(app);
  registTravelListCallback(app);
  registTravelCallback(app);
}
