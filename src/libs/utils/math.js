const getRandomNumber = (max) => {
  const randomNo = Math.floor(Math.random() * max);
  return randomNo;
};

const getNextRoundRobin = (current, total) => {
  let index = current;
  if (current >= total - 1) {
    index = 0;
  } else {
    index += 1;
  }
  return index;
};

export { getRandomNumber, getNextRoundRobin };
