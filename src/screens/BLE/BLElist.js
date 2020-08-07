import React, { useEffect, useContext } from 'react'
import {
  Dimensions,
  StyleSheet,
  Text,
  FlatList,
  TouchableHighlight,
  View
} from 'react-native'
import { Container, Footer } from 'native-base'
import { useSelector, useDispatch } from 'react-redux'
import { connectDeviceCompletely, startScan } from '../../actions'
import DataActivityIndicator from '../../components/DataActivityIndicator'
import { AuthContext } from '../../AuthProvider'

// small component showing the status of BLE connection
const BLEStatus = () => {
  const { connectedDevice, status } = useSelector(state => state.BLEs)

  return (
    <Container>
      <Text>Status: {status}</Text>
      {connectedDevice && <Text>Device: {connectedDevice.name}</Text>}
    </Container>
  )
}

const BLEList = (props) => {
  const dispatch = useDispatch()
  const { logout } = useContext(AuthContext)
  const BLEList = useSelector(state => state.BLEs.BLEList)

  useEffect(() => {
    dispatch(startScan())
  })

  const connectToDevice = (device) => {
    dispatch(connectDeviceCompletely(device))
    props.navigation.navigate('BLESelectedDeviceScreen')
  }

  return (
    <Container>
      <FlatList
        data={BLEList}
        renderItem={({ item }) =>
          <TouchableHighlight onPress={() => connectToDevice(item)} style={styles.rowFront} underlayColor='#DDDDDD'>
            <View>
              <Text style={{ color: 'white', fontWeight: 'bold' }}>
                 Tap to connect to: {item.name}
              </Text>
            </View>
          </TouchableHighlight>}
        keyExtractor={item => item.id.toString()}
        ListEmptyComponent={DataActivityIndicator}
      />

      <TouchableHighlight onPress={logout} style={styles.rowFront} underlayColor='#DDDDDD'>
        <View>
          <Text style={{ color: 'white', fontWeight: 'bold' }}>
            Logout
          </Text>
        </View>
      </TouchableHighlight>

      <Footer>
        <BLEStatus />
      </Footer>
    </Container>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1
  },
  standalone: {
    marginTop: 30,
    marginBottom: 30
  },
  standaloneRowFront: {
    alignItems: 'center',
    backgroundColor: '#CCC',
    justifyContent: 'center',
    height: 50
  },
  standaloneRowBack: {
    alignItems: 'center',
    backgroundColor: '#8BC645',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15
  },
  backTextWhite: {
    color: '#FFF'
  },
  rowFront: {
    alignItems: 'center',
    backgroundColor: '#4DA6A6',
    borderBottomColor: 'white',
    borderBottomWidth: 4,
    justifyContent: 'center',
    height: 50
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: '#DDD',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15
  },
  backRightBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75
  },
  backRightBtnLeft: {
    backgroundColor: 'blue',
    right: 75
  },
  backRightBtnRight: {
    backgroundColor: 'red',
    right: 0
  },
  controls: {
    alignItems: 'center',
    marginBottom: 30
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 5
  },
  switch: {
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'black',
    paddingVertical: 10,
    width: Dimensions.get('window').width / 4
  },
  trash: {
    height: 25,
    width: 25
  }
})

export default BLEList
