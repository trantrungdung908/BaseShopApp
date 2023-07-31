import * as React from 'react';
import {memo, useEffect, useMemo, useState} from 'react';
import moment, {Moment} from 'moment';
import {getDateFormat} from '@/services/FormatDate';

const getText = (time: Moment, withoutSuffix: boolean = true) => {
  const diffInSeconds = Math.abs(time.diff(undefined, 'second'));
  if (diffInSeconds <= 60 * 60 * 5) {
    return time.fromNow(withoutSuffix);
  }
  if (diffInSeconds <= 60 * 60 * 24) {
    return time.format('HH:mm');
  } // 1 day
  if (diffInSeconds <= 60 * 60 * 24 * 183) {
    return time.format('HH:mm DD/MM');
  } // 1 year
  return time.format('HH:mm DD/MM/YYYY');
};

const getTimeout = (time: Moment) => {
  const diffInSeconds = Math.abs(time.diff(undefined, 'second'));
  if (diffInSeconds < 60) {
    return 30000;
  } // 30s refresh
  if (diffInSeconds < 60 * 60 * 5) {
    return 1000 * 60 * 60;
  } // 1 hour refresh
  return 0;
};

interface Props {
  time: number; // time in miliseconds
  withoutSuffix?: boolean;
}

/**
 * Simply return a text component, must put inside a <Text/> component
 * If time diff is less than 5 hours, return a relative time
 * If time diff is less than 1 day, just show hours and minutes HH:mm
 * If time diff is less than 6 months, show hours, minutes, date and month HH:mm DD/MM
 * If time diff is more than 6 months, show year.
 */
const TimeAgo = memo(({time, withoutSuffix = true}: Props) => {
  const timeMoment = useMemo(() => moment(time), [time]);
  const timeout = useMemo(() => getTimeout(timeMoment), [timeMoment]);

  const [timeText, setTimeText] = useState(() =>
    getDateFormat(time, 'HH:mm DD/MM/YYYY'),
  );

  useEffect(() => {
    if (!timeout) {
      return () => {};
    }

    const interval = setInterval(() => {
      const newTimeout = getTimeout(timeMoment);
      setTimeText(timeMoment.fromNow(withoutSuffix));
    }, timeout);

    return () => {
      clearInterval(interval);
    };
  }, [timeMoment, timeout, withoutSuffix]);

  return <>{timeText}</>;
});

TimeAgo.displayName = 'TimeAgo';

export default TimeAgo;
