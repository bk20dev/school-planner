import React, { FC, useState } from 'react';
import DropDown from 'react-native-paper-dropdown';

export interface StyledDropDownProps {
  label: any;
  list: any[];
  value: any;
  setValue: (value: any) => void;
}

const StyledDropDown: FC<StyledDropDownProps> = props => {
  const [visible, setVisible] = useState(false);

  return (
    <DropDown
      mode="outlined"
      visible={visible}
      showDropDown={() => setVisible(true)}
      onDismiss={() => setVisible(false)}
      {...props}
    />
  );
};

export default StyledDropDown;
