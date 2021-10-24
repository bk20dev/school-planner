import React, { FC } from 'react';
import { Appbar, Menu } from 'react-native-paper';
import { useNavigation } from '@react-navigation/core';
import { Routes } from '../constants/Routes';

export const Settings: FC = () => {
  const navigation = useNavigation();
  const [visible, setVisible] = React.useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  return (
    <Menu
      visible={visible}
      onDismiss={closeMenu}
      anchor={
        <Appbar.Action
          icon="dots-vertical"
          color="black"
          onPress={() => setVisible(true)}
        />
      }>
      <Menu.Item
        onPress={() => {
          // @ts-ignore
          navigation.navigate(Routes.AddSubject);
          setVisible(false);
        }}
        title="Add subject"
      />
      <Menu.Item
        onPress={() => {
          // @ts-ignore
          navigation.navigate(Routes.RemoveSubject);
          setVisible(false);
        }}
        title="Remove subject"
      />
    </Menu>
  );
};
