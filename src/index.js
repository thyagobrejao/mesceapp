import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Login from './pages/login';
import Main from './pages/main/routes';

const App = createStackNavigator({
  //Constant which holds all the screens like index of any book 
  Login: { screen: Login },
  //First entry by default be our first screen if we do not define initialRouteName
  Main: { screen: Main },
},
  {
    initialRouteName: 'Login',
    headerMode: 'none',
  }
);

export default createAppContainer(App);
