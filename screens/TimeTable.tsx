import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';

const TimeTable = () => {
  const [lesson, setLesson] = useState('');

  return (
    <View>
      <Text>Lesson plan</Text>
      <TextInput value={lesson} onChangeText={value => setLesson(value)} />
      <Button
        title="Add lesson"
        onPress={() => {
            console.log(`adding ${lesson} to the lessons list`);
        }}
      />
    </View>
  );
};

export default TimeTable;
