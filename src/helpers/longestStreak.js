import moment from 'moment';

const { RRule } = require('rrule');

const buildStreakObj = (tasks) => {
  const streakObj = [];

  tasks.forEach((task) => {
    const taskDates = RRule.fromString(task.r_rule).all().map(date => {
      return moment(date).format('YYYY-MM-DD');
    });

    const statusDates = task.taskStatus.map(status =>
      moment(status.task_date).format('YYYY-MM-DD'));

    let statusIndex = 0;
    let taskIndex = 0;
    let longestStreakValue = 0;
    let streakValue = 0;
    while (statusIndex < statusDates.length && taskIndex < taskDates.length) {
      if (statusDates[statusIndex] === taskDates[taskIndex]) {
        streakValue++;
        if (streakValue > longestStreakValue) {
          longestStreakValue = streakValue;
        }
        statusIndex++;
        taskIndex++;
      } else {
        streakValue = 0;
        taskIndex++;
      }
    }
    streakObj.push({ id: task.id, name: task.task_name, streak: longestStreakValue });
  });

  const sortedArray = streakObj.sort(compare);
  const topStreaks = sortedArray.length > 3 ? sortedArray.slice(0, 3) : sortedArray;

  const streaksForAnimation = topStreaks.length ? decideFillValue(topStreaks) : [];
  return streaksForAnimation;
};

const compare = (a, b) => {
  if (a.streak < b.streak) return 1;
  if (a.streak > b.streak) return -1;
  return 0;
};

const decideFillValue = (topStreaks) => {
  console.log(topStreaks);
    if (topStreaks[0]) {
      topStreaks[0].fillValue = 80;
      topStreaks[0].color = '#FE5F55';
    }

    if (topStreaks[1]) {
      topStreaks[1].color = '#17BEBB';
      if (topStreaks[0].streak === topStreaks[1].streak) {
        topStreaks[1].fillValue = 80;
      } else {
        topStreaks[1].fillValue = 60;
      }
    }

    if (topStreaks[2]) {
      topStreaks[2].color = '#EAC435';
      if (topStreaks[2].streak === topStreaks[1].streak) {
        topStreaks[2].fillValue = topStreaks[1].fillValue;
      } else {
        topStreaks[2].fillValue = 35;
      }
    }
    return topStreaks;
};

export { buildStreakObj };
