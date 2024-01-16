import { getUnixTime } from 'date-fns';

export function fromDateToUnix(date: Date) {
  return getUnixTime(date);
}
