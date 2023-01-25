import { src }              from 'gulp';
import plumber              from 'gulp-plumber';
import { isDevelopmentEnv } from './env';
import { sassOptions }      from './options';

const lintCssTask = (source) => {
  let task = src([source]);

  if (isDevelopmentEnv) {
    task = task.pipe(plumber());
  }

  if (isDevelopmentEnv) {
    task = task.pipe(plumber.stop());
  }

  return task;
};

const lintCss = () => lintCssTask(sassOptions.files);

export {
  lintCssTask,
  lintCss,
};
