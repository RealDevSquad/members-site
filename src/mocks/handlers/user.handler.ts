import { rest } from 'msw';
import { userData } from '../db/user';
import { usersData } from '../db/allUsers';
const URL = process.env.NEXT_PUBLIC_BASE_URL;

const username = 'vinayak';

const userId = userData.id;

const userHandler = [
  rest.get(`${URL}/users/${username}`, (_, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({ message: 'User returned successfully!', user: userData }),
    );
  }),
  rest.get(`${URL}/users?size=100`, (_, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({ message: 'Users returned successfully!', users: usersData }),
    );
  }),
  rest.get(`${URL}/users?roles=member`, (_, res, ctx) => {
    const members = usersData.filter((user) => user.roles?.member === true);
    return res(
      ctx.status(200),
      ctx.json({ message: 'Users returned successfully!', users: members }),
    );
  }),
  rest.patch(`${URL}/users/${userId}/temporary/data`, (_, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({ message: 'User role updated successfully!' }),
    );
  }),
];

export default userHandler;
