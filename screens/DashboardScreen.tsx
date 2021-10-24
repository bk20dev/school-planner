import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import _ from 'lodash';
import { DailyOverview } from '../components/DailyOverview';
import { Fab } from '../components/Fab';
import { useNavigation } from '@react-navigation/native';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
  },
});

export const DashboardScreen = () => {
  const events = useSelector((state: RootState) => state.eventsSlice);
  const groups = _.chain(events)
    .groupBy('date')
    .toPairs()
    .sortBy(0)
    .value()
    .reverse();

  const navigation = useNavigation();

  return (
    <>
      <ScrollView style={styles.container}>
        {groups.map(([date, events]) => {
          const items = events.map(({ subject, type }) => ({
            title: subject,
            description: type,
            tags: [],
          }));

          return (
            <DailyOverview key={date} date={new Date(date)} events={items} />
          );
        })}
      </ScrollView>

      {/* @ts-ignore */}
      <Fab onPress={() => navigation.navigate('AddEvent')} />
    </>
  );
};
