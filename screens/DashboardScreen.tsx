import React, { FC } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import _ from 'lodash';
import { DailyOverview } from '../components/DailyOverview';
import { Fab } from '../components/Fab';
import { useNavigation } from '@react-navigation/native';
import { ImagePlaceholder } from '../components/ImagePlaceholder';

export const DashboardScreen = () => {
  const events = useSelector((state: RootState) => state.eventsSlice);
  const overview = _.chain(events)
    .groupBy('date')
    .toPairs()
    .sortBy(0)
    .value()
    .reverse();

  const navigation = useNavigation();

  const renderList = () => {
    return overview.map(([date, events]) => {
      const items = events.map(({ subject, type }) => ({
        title: subject,
        description: type,
        tags: [],
      }));

      return <DailyOverview key={date} date={new Date(date)} events={items} />;
    });
  };

  const renderOverview = () => {
    if (overview.length)
      return <ScrollView style={styles.container}>{renderList()}</ScrollView>;
    return <ImagePlaceholder />;
  };

  return (
    <>
      {renderOverview()}
      {/* @ts-ignore */}
      <Fab onPress={() => navigation.navigate('AddEvent')} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
  },
});
