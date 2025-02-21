import dayjs from 'dayjs';

export const convertUnixToImperialTime = (timestamp: number) => {
  return dayjs.unix(timestamp).format('h:mm A');
};
