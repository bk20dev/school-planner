import { DefaultTheme as PaperTheme } from 'react-native-paper';
import { DefaultTheme as NavigationTheme } from '@react-navigation/native';

const AppTheme = {
  ...NavigationTheme,
  ...PaperTheme,
  colors: {
    ...NavigationTheme.colors,
    ...PaperTheme.colors,
    background: '#fff',
    primary: '#FD9800',
  },
};

export default AppTheme;
