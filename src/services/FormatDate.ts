import moment from './MomentService';

export const getFullTime = (ts: string | number) => {
  if (ts === 0) {
    return '';
  }
  return moment(ts, 'X').format('HH:mm DD/MM/YYYY');
};

export const getTime = (ts: string | number) => {
  return moment(ts, 'X').format('HH:mm');
};

export const getFullDayName = (ts: string | number) => {
  return moment(ts, 'X').format('dddd');
};

export const getShortMonthDay = (ts: string | number) => {
  return moment(ts, 'X').format('MMM DD');
};

export const getDateFormat = (ts: string | number, format: string) => {
  return moment(ts, 'X').format(format);
};

export const getCurrentDate = (format: string) => {
  const date = new Date();
  return moment(date).format(format);
};

export const dateStringToTimestamp = (input: string, format?: string) => {
  return moment(input, format || 'DD/MM/YYYY')
    .unix()
    .toString();
};

export const getTimeStamp = () => {
  const date = new Date();
  return date.getTime() / 1000;
};

export const getWeekDay = (ts: string | number): number => {
  return moment(ts, 'X').weekday();
};

export const getWeekIndexOfYear = (ts: string | number): number => {
  return moment(ts, 'X').week();
};

export const getYear = (ts: string | number): number => {
  return moment(ts, 'X').year();
};

export const getTotalWeekInYear = (ts: string | number): number => {
  return moment(ts, 'X').weeksInYear();
};

export const getStringWithFormat = (date: Date, format: string): string => {
  return moment(date).format(format);
};

export const getDateFromStringWithFormat = (
  dateStr: string,
  format: string,
): Date => {
  return moment(dateStr, format).toDate();
};

export const startOfMonth = (date: Date): Date => {
  return new Date(date.getFullYear(), date.getMonth(), 1);
};

export const getDateFormatUTC = (ts: string | number, format: string) => {
  return moment.utc(ts).format(format);
};

export const getMonday = (d: Date) => {
  d = new Date(d);
  var day = d.getDay(),
    diff = d.getDate() - day + (day == 0 ? -6 : 1); // adjust when day is sunday
  return new Date(d.setDate(diff));
};

export const getDateFormatByTimeZone = (
  ts: string | number,
  format: string,
): string => {
  return moment(ts).utc().local().format(format);
};
