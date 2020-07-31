import React, { useContext, useState, useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import auth from '@react-native-firebase/auth'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
// import SignupScreen from '../screens/SignupScreen';
import LoginScreen from './LoginScreen'
import Icon from 'react-native-vector-icons/Ionicons'
import BLEList from './BLElist'
import BLEservices from './BLEservices'
import BLEservicecharacteristics from './BLEservicecharacteristics'
import BLECharacteristic from './BLEcharacteristics'
import { AuthContext } from './AuthProvider'
import Loading from './components/Loading'
import Home from './Home'
import Data from './Data'

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

function AuthStack () {
  return (
    <Stack.Navigator initialRouteName='Login'>
      <Stack.Screen
        name='Login'
        component={LoginScreen}
        options={{ header: () => null }}
      />
      {/* <Stack.Screen name='Signup' component={SignupScreen} /> */}
    </Stack.Navigator>
  )
}

function MyTabs () {
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
        name='BLE'
        component={BLEScreens}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name='bluetooth-outline' color={color} size={size} />
          )
        }}
      />
      <Tab.Screen
        name='Home'
        component={Home}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name='person-outline' color={color} size={size} />
          )
        }}
      />
      <Tab.Screen
        name='Data'
        component={Data}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name='stats-chart-outline' color={color} size={size} />
          )
        }}
      />
    </Tab.Navigator>
  )
}

function BLEScreens () {
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
      <Stack.Screen name='BLEDevices' component={BLEList} />
      <Stack.Screen name='BLEServices' component={BLEservices} />
      <Stack.Screen name='BLECharacteristics' component={BLEservicecharacteristics} />
      <Stack.Screen name='BLECharacteristic' component={BLECharacteristic} />
    </Stack.Navigator>
  )
}

export default function Routes () {
  const { user, setUser } = useContext(AuthContext)
  const [loading, setLoading] = useState(true)
  const [initializing, setInitializing] = useState(true)

  // Handle user state changes
  function onAuthStateChanged (user) {
    setUser(user)
    if (initializing) setInitializing(false)
    setLoading(false)
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged)
    return subscriber // unsubscribe on unmount
  }, [])

  if (loading) {
    return <Loading />
  }

  return (
    <NavigationContainer>
      {user ? <MyTabs /> : <AuthStack />}
    </NavigationContainer>
  )
}
