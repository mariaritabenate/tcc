import React from 'react'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import AuthLoadingScreen from '../screens/AuthLoadingScreen'
import CalendarScreen from '../screens/CalendarScreen'
import ConfigScreen from '../screens/ConfigScreen'
import MenuScreen from '../screens/MenuScreen'
import ProfileScreen from '../screens/ProfileScreen'
import SignInScreen from '../screens/SignInScreen'
import SignUpScreen from '../screens/SignUpScreen'
import TipsScreen from '../screens/TipsScreen'

import MainTabNavigator from './MainTabNavigator'

export default createAppContainer(
    createSwitchNavigator({
            Main: MainTabNavigator,
            AuthLoading: AuthLoadingScreen,
            Auth: SignInScreen,
            SignUp: SignUpScreen,
            Menu: MenuScreen,
            Calendar: CalendarScreen,
            Tips: TipsScreen,
            Config: ConfigScreen,
            Profile: ProfileScreen
        },
        {
            initialRouteName: 'AuthLoading'
        })
)
