import { EventItem, EventItemProps } from './EventItem';
import React, { Fragment } from 'react';
import { StyleSheet, View } from 'react-native';

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

export const EventList = ({ events }: { events: EventItemProps[] }) => {
  return (
    <View style={styles.container}>
      {events.map(({ title, description, tags }, i) => (
        <Fragment key={i}>
          <EventItem title={title} description={description} tags={tags} />
          {i !== events.length - 1 && <View style={styles.spacer} />}
        </Fragment>
      ))}
    </View>
  );
};
