import React, { FC } from 'react';
import { TextInput } from 'react-native-paper';

export interface StyledInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
}

const StyledTextInput: FC<StyledInputProps> = props => {
  return (
    <TextInput
      style={{ backgroundColor: 'white' }}
      mode="outlined"
      {...props}
    />
  );
};

export default StyledTextInput;
