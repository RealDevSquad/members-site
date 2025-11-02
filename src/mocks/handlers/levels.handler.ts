import { http, HttpResponse } from 'msw';
import { levelsData } from '../db/levels';
const URL = process.env.NEXT_PUBLIC_BASE_URL;

const levelsHandler = [
  http.get(`${URL}/levels`, () => {
    return HttpResponse.json({
      message: 'Levels returned Successfully',
      levels: levelsData,
    }, { status: 200 });
  }),
];

export default levelsHandler;
