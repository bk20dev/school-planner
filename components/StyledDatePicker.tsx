import React, { FC, useState } from 'react';
import { Pressable } from 'react-native';
import { TextInput } from 'react-native-paper';
import AppTheme from '../constants/AppTheme';
import DateTimePicker from '@react-native-community/datetimepicker';

export const StyledDatePicker: FC<{
  value: Date;
  setDate: (date: Date) => void;
}> = props => {
  const formatDate = (date: Date) => {
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();

    return `${day}/${month + 1}/${year}`;
  };

  const [visible, setVisible] = useState(false);

  return (
    <>
      <Pressable onPressIn={() => setVisible(true)}>
        <TextInput
          value={formatDate(props.value)}
          mode="outlined"
          label="Date"
          theme={AppTheme}
          right={<TextInput.Icon name={visible ? 'menu-up' : 'menu-down'} />}
          editable={false}
        />
      </Pressable>
      {visible && (
        <DateTimePicker
          testID="dateTimePicker"
          value={props.value}
          mode="date"
          is24Hour={true}
          display="default"
          // @ts-ignore
          onChange={(_, date) => {
            setVisible(false);
            props.setDate(date || props.value);
          }}
        />
      )}
    </>
  );
};
