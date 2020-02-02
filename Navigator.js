import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';

import Drawer from './screens/Drawer'
import Home from './screens/Home'
import Signup from './screens/Signup'
import Login from './screens/Login'
import ForgotPassword from './screens/ForgotPassword'
import CameraPic from './componenets/CameraPic'
import FaceReco from './screens/FaceReco'
import DataExtracter from './screens/DataExtracter'


const MyDrawerNavigator = createDrawerNavigator({
  Login,
  Home,
  FaceReco,
  DataExtracter,
  Signup,
  ForgotPassword,
  
 
  
}, {
  
  contentComponent:Drawer,
});


const HomeNavigator = createStackNavigator({
  MyDrawerNavigator,
  Login:Login,
  Signup:Signup,
  ForgotPassword:ForgotPassword
  
  }, {
    headerMode: 'none',
   
    
  }
);

  


  
  export const AppNavigator = createAppContainer(MyDrawerNavigator);