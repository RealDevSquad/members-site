import { http, HttpResponse } from 'msw';
import { tagsData } from '../db/tags';
const URL = process.env.NEXT_PUBLIC_BASE_URL;

const tagsHandler = [
  http.get(`${URL}/tags`, () => {
    return HttpResponse.json({
      message: 'Tags returned successfully',
      tags: tagsData,
    }, { status: 200 });
  }),
];

export default tagsHandler;
