import * as moment from 'moment';

export default function addSecondsToNow(seconds: number): string {
  return moment().add(seconds, 'seconds').toString();
}
