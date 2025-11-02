import { http, HttpResponse } from 'msw';
import { usersData } from '../db/allUsers';
const URL = process.env.NEXT_PUBLIC_BASE_URL;

const username = 'vinayak';

const allUsersHandler = [
  http.get(`${URL}/users`, () => {
    return HttpResponse.json({
      message: 'Users returned successfully!',
      users: usersData,
    }, { status: 200 });
  }),
  http.patch(`${URL}/members/moveToMembers/${username}`, () => {
    return new HttpResponse(null, { status: 204 });
  }),
  http.patch(`${URL}/members/archiveMembers/${username}`, () => {
    return new HttpResponse(null, { status: 204 });
  }),
];

export default allUsersHandler;
