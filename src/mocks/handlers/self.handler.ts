import { http, HttpResponse } from 'msw';
import { selfUser } from '../db/user';
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const selfUserHandler = [
  http.get(`${BASE_URL}/users`, ({ request }) => {
    const url = new URL(request.url);
    if (url.searchParams.get('profile') === 'true') {
      return HttpResponse.json(selfUser, { status: 200 });
    }
  }),
];

export default selfUserHandler;
