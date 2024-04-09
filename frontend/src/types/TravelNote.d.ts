interface TravelNote {
  _id: string;
  title: string;
  content?: string;
  author: string;
  review: number;
  msg: string;
  covers?: string[],
  delete: number;
}
