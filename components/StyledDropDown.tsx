import React, { FC, useState } from 'react';
import DropDown from 'react-native-paper-dropdown';
import AppTheme from '../constants/AppTheme';

export interface StyledDropDownProps {
  label: any;
  list: any[];
  value: any;
  setValue: (value: any) => void;
}

export const StyledDropDown: FC<StyledDropDownProps> = props => {
  const [visible, setVisible] = useState(false);

  return (
    <DropDown
      mode="outlined"
      visible={visible}
      showDropDown={() => setVisible(true)}
      onDismiss={() => setVisible(false)}
      theme={AppTheme}
      activeColor={AppTheme.colors.text}
      inputProps={{
        outlineColor: visible ? AppTheme.colors.primary : undefined,
      }}
      {...props}
    />
  );
};
