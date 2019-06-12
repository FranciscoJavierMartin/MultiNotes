import {StackNavigator} from 'react-navigation';
import screeens from './screens';
import MainAppTabNavigator from './MainAppTabNavigation';

const routes = {
    [screeens.App]: {screen: MainAppTabNavigator},
};

const MainNavigator = StackNavigator(routes, {
    headerMode: 'none',
    model: 'modal',
});

export default MainNavigator;