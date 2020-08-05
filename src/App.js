import 'react-native-gesture-handler';
import React from 'react';

import { Provider } from 'react-redux';
import { createStore,applyMiddleware } from 'redux';
import rootReducer from './reducers/index';
import thunk from 'redux-thunk';
import Routes from './Routes'

import Icon from 'react-native-vector-icons/Ionicons';

import {BleManager} from 'react-native-ble-plx';

import Home from './screens/Home'
import Data from './screens/Data'
import BLEList from './screens/BLE/BLElist';
import BLEservices from './screens/BLE/BLEservices'
import BLEservicecharacteristics from './screens/BLE/BLEservicecharacteristics'
import BLESelectedDeviceScreen from './screens/BLE/BLESelectedDeviceScreen'
import BLECharacteristic from './screens/BLE/BLEcharacteristics'
import { composeWithDevTools } from 'redux-devtools-extension';

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Text,
  View,
  StatusBar,
} from 'react-native';

import {
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AuthProvider } from './AuthProvider';

const DeviceManager = new BleManager();

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
        tabBarOptions={{
          activeBackgroundColor: '#4DA6A6',
          activeTintColor: '#FFF',
          inactiveTintColor: '#000',
          showLabel: false
        }}
      >
      <Tab.Screen 
      name="BLE" 
      component={BLEScreens} 
      options={{ 
          tabBarIcon: ({color, size}) => (
            <Icon name="bluetooth-outline" color={color} size={size}/>
          )
        }}
      />
      <Tab.Screen 
        name="Home" 
        component={Home} 
        options={{ 
          tabBarIcon: ({color, size}) => (
            <Icon name="person-outline" color={color} size={size}/>
          )
        }}
      />
      <Tab.Screen name="Data" 
      component={Data} 
      options={{ 
          tabBarIcon: ({color, size}) => (
            <Icon name="stats-chart-outline" color={color} size={size}/>
          )
        }}
      />
    </Tab.Navigator>
  );
}

function BLEScreens() {
  return (
    <Stack.Navigator
      screenOptions={{
          headerTitleStyle: {
            fontWeight: 'bold',
            color: '#000'
          },
          headerTintColor: 'white'
        }}
    >
      <Stack.Screen name="BLEDevices" component={BLEList} />
      <Stack.Screen name="BLEServices" component={BLEservices} />
      <Stack.Screen name='BLESelectedDeviceScreen' component={BLESelectedDeviceScreen} />
      <Stack.Screen name="BLECharacteristics" component={BLEservicecharacteristics} />
      <Stack.Screen name="BLECharacteristic" component={BLECharacteristic} />
    </Stack.Navigator>
  )
}

const composeEnhancers = composeWithDevTools({
  // Specify here name, actionsBlacklist, actionsCreators and other options
});

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk.withExtraArgument(DeviceManager))));

const App: () => React$Node = () => {

  return (
    <>
      <Provider store={ store }>
          <AuthProvider>
            <Routes />
          </AuthProvider>
      </Provider>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
