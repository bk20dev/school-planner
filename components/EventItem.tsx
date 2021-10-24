import { useNavigation } from '@react-navigation/core';
import React, { FC } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Routes } from '../constants/Routes';
import { Event } from '../types/Event';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 18,
  },
  spacer: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    flexGrow: 1,
  },
  description: {
    fontSize: 14,
    color: 'rgba(0,0,0,.6)',
  },
});

interface EventItemProps {
  event: Event;
}

export const EventItem: FC<EventItemProps> = ({ event }) => {
  const navigation = useNavigation();

  const openDetails = () => {
    // @ts-ignore
    navigation.navigate(Routes.SubjectDetails, {
      event,
    });
  };

  return (
    <TouchableOpacity onPress={openDetails}>
      <View style={styles.container}>
        <Text style={styles.title}>{event.subject}</Text>
        <View style={styles.spacer} />
        <Text style={styles.description}>{event.type}</Text>
      </View>
    </TouchableOpacity>
  );
};
