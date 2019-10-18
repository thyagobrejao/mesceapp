import {createStackNavigator} from 'react-navigation';

import Login from './pages/login';
import Main from './pages/main';

const Routes = createStackNavigator({
  Login,
  Main,
});

export default Routes;
