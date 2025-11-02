import { http, HttpResponse } from 'msw';
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const username = 'vinayak';

const activeTasksHandler = [
  http.get(`${BASE_URL}/tasks/${username}`, ({ request }) => {
    const url = new URL(request.url);
    if (url.searchParams.get('status') === 'IN_PROGRESS') {
      return HttpResponse.json(
        {
          message: 'Tasks returned successfully!',
          tasks: [],
        },
        { status: 200 },
      );
    }
  }),
];

export default activeTasksHandler;
