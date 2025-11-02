import { rest } from 'msw';
import { userData } from '../db/user';
const URL = process.env.NEXT_PUBLIC_BASE_URL;

const username = 'vinayak';

const userId = userData.id;

const userHandler = [
  rest.get(`${URL}/users/${username}`, (_, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        message: 'User returned successfully!',
        user: userData,
      }),
    );
  }),
  http.patch(`${URL}/users/${userId}/temporary/data`, () => {
    return HttpResponse.json(
      {
        message: 'User role updated successfully!',
      },
      { status: 200 },
    );
  }),
];

export default userHandler;
