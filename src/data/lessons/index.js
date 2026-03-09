import { mathLessons } from './lessons-math';
import { frLessons } from './lessons-fr';
import { histLessons } from './lessons-hist';
import { geoLessons } from './lessons-geo';
import { sciLessons } from './lessons-sci';
import { engLessons } from './lessons-eng';
import { emcLessons } from './lessons-emc';

export const lessons = {
  ...mathLessons,
  ...frLessons,
  ...histLessons,
  ...geoLessons,
  ...sciLessons,
  ...engLessons,
  ...emcLessons,
};
