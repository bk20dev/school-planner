import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Indicator } from './Indicator';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 18,
  },
  indicators: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    flexGrow: 1,
  },
  description: {
    fontSize: 14,
    color: 'rgba(0,0,0,.6)',
  },
});

export interface EventItemProps {
  title: string;
  description: string;
  tags: string[];
}

export const EventItem = ({ title, description, tags }: EventItemProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.indicators}>
        {tags.map((color, i) => (
          <Indicator key={i} color={color} />
        ))}
      </View>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
};
