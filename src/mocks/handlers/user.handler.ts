import { http, HttpResponse } from 'msw';
import { userData } from '../db/user';
const URL = process.env.NEXT_PUBLIC_BASE_URL;

const username = 'vinayak';

const userHandler = [
  http.get(`${URL}/users/${username}`, () => {
    return HttpResponse.json({
      message: 'User returned successfully!',
      user: userData,
    }, { status: 200 });
  }),
];

export default userHandler;
