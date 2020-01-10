import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Main from './pages/Main';
import repoWeb from './pages/repoWeb';
import User from './pages/User';

const Routes = createAppContainer(
  createStackNavigator(
    {
      Main,
      User,
      repoWeb,
    },
    {
      headerLayoutPreset: 'center',
      headerBackTitleVisible: false,
      defaultNavigationOptions: {
        headerStyle: {
          backgroundColor: '#7159c1',
        },
        headerTintColor: '#fff',
      },
    }
  )
);

export default Routes;
