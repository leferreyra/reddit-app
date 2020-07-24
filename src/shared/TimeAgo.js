import React from 'react';
import TimeAgo from 'react-time-ago';
import JSTimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';

JSTimeAgo.addLocale(en);

export default function({ date }) {
  const _date = new Date(date * 1000);
  return (
    <TimeAgo date={_date} />
  );
}
