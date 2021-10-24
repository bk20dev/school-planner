import { EventItem } from './EventItem';
import React, { FC, Fragment } from 'react';
import { StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { Routes } from '../constants/Routes';
import { Event } from '../types/Event';

const styles = StyleSheet.create({
  container: {
    borderColor: '#EBEBEB',
    borderWidth: 1,
    borderRadius: 16,
  },
  spacer: {
    borderBottomColor: '#EBEBEB',
    borderBottomWidth: 1,
  },
});

interface EventListProps {
  events: Event[];
}

export const EventList: FC<EventListProps> = ({ events }) => {
  return (
    <View style={styles.container}>
      {events.map((event, i) => (
        <Fragment key={i}>
          <EventItem event={event} />
          {i !== events.length - 1 && <View style={styles.spacer} />}
        </Fragment>
      ))}
    </View>
  );
};
