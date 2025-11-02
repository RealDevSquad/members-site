import { http, HttpResponse } from 'msw';
import { skillsData } from '../db/skills';
const URL = process.env.NEXT_PUBLIC_BASE_URL;

const username = 'KTkF4vAd6tsuBw84oZXt';

const skillsHandler = [
  http.get(`${URL}/users/${username}/skills`, () => {
    return HttpResponse.json({
      message: 'Skills returned successfully',
      skills: skillsData,
    }, { status: 200 });
  }),
];

export default skillsHandler;
