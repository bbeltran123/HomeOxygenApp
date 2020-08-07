import 'react-native-gesture-handler';
import React from 'react';

import { Provider } from 'react-redux';
import { createStore,applyMiddleware } from 'redux';
import rootReducer from './reducers/index';
import thunk from 'redux-thunk';
import Routes from './Routes'

import {BleManager} from 'react-native-ble-plx';
import { composeWithDevTools } from 'redux-devtools-extension';

import { AuthProvider } from './AuthProvider';

const DeviceManager = new BleManager();


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


export default App;
