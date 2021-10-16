import { StyleSheet, View } from 'react-native';
import React from 'react';

const styles = StyleSheet.create({
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 8,
    margin: 4,
  },
});

export const Indicator = ({ color }: { color: string }) => {
  return <View style={[styles.indicator, { backgroundColor: color }]} />;
};
