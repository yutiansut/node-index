import { AppRegistry } from 'react-native';
import AppMain from './App';
import SelectionF from './Selection';
import {
  StackNavigator,
} from 'react-navigation';

const App = StackNavigator({
  Main: {screen: AppMain},
  Profile: {screen: SelectionF},
});

AppRegistry.registerComponent('Myapp', () => App);
