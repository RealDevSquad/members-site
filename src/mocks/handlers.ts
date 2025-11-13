import tagsHandler from './handlers/tags.handler';
import skillsHandler from './handlers/skills.handler';
import levelsHandler from './handlers/levels.handler';
import { itemsHandler } from './handlers/items.handler';
import userHandler from './handlers/user.handler';
import selfUserHandler from './handlers/self.handler';
import contributionsHandler from './handlers/contributions.handler';
import activeTasksHandler from './handlers/activeTask.handler';
import taskHandler from './handlers/task.handler';

export const handlers = [
  ...tagsHandler,
  ...levelsHandler,
  ...skillsHandler,
  ...itemsHandler,
  ...userHandler,
  ...selfUserHandler,
  ...contributionsHandler,
  ...activeTasksHandler,
  ...taskHandler,
];
