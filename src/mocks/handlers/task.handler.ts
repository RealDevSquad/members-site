import { http, HttpResponse } from 'msw';
const URL = process.env.NEXT_PUBLIC_BASE_URL;

const taskId = '007ql3W886LKPqXSf1Jn';

const taskHandler = [
  http.patch(`${URL}/tasks/${taskId}`, () => {
    return HttpResponse.json(
      {
        message: 'task updated!',
      },
      { status: 204 },
    );
  }),
];

export default taskHandler;
