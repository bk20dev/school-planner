import DashboardIcon from '../assets/icons/space_dashboard_black_24dp.svg';
import EventIcon from '../assets/icons/event_black_24dp.svg';
import HistoryEduIcon from '../assets/icons/history_edu_black_24dp.svg';
import TaskAltIcon from '../assets/icons/task_alt_black_24dp.svg';
import {Image, Platform} from "react-native";
import React from "react";

const getIconForRoute = (name: string) => {
  switch (name) {
    case 'Dashboard':
      return DashboardIcon;
    case 'Homework':
      return TaskAltIcon;
    case 'Exams':
      return HistoryEduIcon;
    case 'Schedule':
      return EventIcon;
  }
};

export const RouteIcon = ({ route}: {route: string}) => {
  const Icon = getIconForRoute(route);

  if(Platform.OS === 'web') {
    return <Image source={{ uri: Icon, width: 24, height: 24 }} />
  } else {
    return <Icon width={24} height={24} />;
  }
}
