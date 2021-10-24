import { StyleSheet, View } from 'react-native';
import AppTheme from '../constants/AppTheme';
import React from 'react';
import { IconButton, TouchableRipple } from 'react-native-paper';

export const Fab = ({ onPress }: { onPress: () => void }) => {
  return (
    <View style={styles.fab}>
      <View style={styles.wrapper}>
        <TouchableRipple onPress={onPress}>
          <IconButton icon="plus" color="#fff" size={24} />
        </TouchableRipple>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  fab: {
    margin: 16,
    right: 0,
    bottom: 0,
    position: 'absolute',
  },
  wrapper: {
    borderRadius: 48,
    overflow: 'hidden',
    backgroundColor: AppTheme.colors.primary,
  },
});
