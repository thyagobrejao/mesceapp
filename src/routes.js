import {createStackNavigator} from 'react-navigation-stack';

import Login from './pages/login';
import Main from './pages/main';

const Routes = createStackNavigator({
  //Constant which holds all the screens like index of any book 
  Login: { screen: Login },
  Main: { screen: Main },
},
{
  initialRouteName: 'Login',
}
);

export default Routes;
