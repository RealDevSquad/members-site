import { http, HttpResponse } from 'msw';
import { allContributionsData } from '../db/contributions';
const URL = process.env.NEXT_PUBLIC_BASE_URL;

const username = 'vinayak';

const contributionsHandler = [
  http.get(`${URL}/contributions/${username}`, () => {
    return HttpResponse.json({
      noteworthy: [],
      all: allContributionsData,
    }, { status: 200 });
  }),
];

export default contributionsHandler;
