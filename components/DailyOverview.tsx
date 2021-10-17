import { StyleSheet, Text } from 'react-native';
import { EventList } from './EventList';
import React from 'react';
import { months, weekdays } from '../constants/calendar';
import { EventItemProps } from './EventItem';

const styles = StyleSheet.create({
  date: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
});

const formatDate = (date: Date) => {
  const day = date.getDate();
  const weekday = weekdays[date.getDay()];
  const month = months[date.getMonth()];

  return `${weekday}, ${day} ${month}`;
};

export const DailyOverview = ({
  date,
  events,
}: {
  date: Date;
  events: EventItemProps[];
}) => (
  <>
    <Text style={styles.date}>{formatDate(date)}</Text>
    <EventList events={events} />
  </>
);
