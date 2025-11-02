import { http, HttpResponse } from 'msw';
import { skillsData } from '../db/skills';
const URL = process.env.NEXT_PUBLIC_BASE_URL;

export const itemsHandler = [
  http.post(`${URL}/items`, () => {
    return HttpResponse.json({
      message: '',
      skills: skillsData[0],
    }, { status: 200 });
  }),
  http.delete(`${URL}/items`, () => {
    return HttpResponse.json({
      message: '',
      skills: skillsData,
    }, { status: 200 });
  }),
];
