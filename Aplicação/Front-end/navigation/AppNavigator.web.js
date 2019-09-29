import { createBrowserApp } from '@react-navigation/web';
import { createSwitchNavigator } from 'react-navigation';
import AuthLoadingScreen from '../screens/AuthLoadingScreen'
import SignInScreen from '../screens/SignInScreen'
import SignUpScreen from '../screens/SignUpScreen'

import MainTabNavigator from './MainTabNavigator';

const switchNavigator = createSwitchNavigator({
      Main: MainTabNavigator,
      AuthLoading: AuthLoadingScreen,
      Auth: SignInScreen,
      SignUp: SignUpScreen
    },
    {
      initialRouteName: 'AuthLoading'
    });
switchNavigator.path = '';

export default createBrowserApp(switchNavigator, { history: 'hash' });
