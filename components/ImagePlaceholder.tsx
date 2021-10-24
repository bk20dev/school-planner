import {StyleSheet, Text, View} from "react-native";
import RocketImage from "../assets/rocket.svg";
import React from "react";

export const ImagePlaceholder = () => {
  return (
    <View style={styles.container}>
      <RocketImage height={100} />
      <Text style={styles.text}>Nothing left to study{'\n'}#winning</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
    fontSize: 14,
    marginTop: 32,
    opacity: .4
  }
});
