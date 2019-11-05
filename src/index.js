import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Login from './pages/login';
import Main from './pages/main/routes';
import Forgot from './pages/login/forgot';

const App = createStackNavigator({
  //Constant which holds all the screens like index of any book 
  Login: { screen: Login },
  //First entry by default be our first screen if we do not define initialRouteName
  Main: { screen: Main },

  Forgot: { screen: Forgot },
},
  {
    initialRouteName: 'Login',
    headerMode: 'none',
  }
);

export default createAppContainer(App);
