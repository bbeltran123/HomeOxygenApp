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

  const DeviceListItem = (item) => {
    return (
      <View style={styles.container}>
        <Text style={styles.rowTitleText}> {item.item.name} </Text>
        <View style={styles.rowContainer}>
          <View style={{ height: 100, width: 100, backgroundColor: 'blue' }} />
          <TouchableHighlight onPress={() => { connectToDevice(item.item) }} style={styles.rowFront} underlayColor='#DDDDDD'>
            <Text style={styles.rowFrontText}>
              Connect
            </Text>
          </TouchableHighlight>
        </View>
        <View style={styles.borderView} />
      </View>
    )
  }

  return (
    <Container>
      <FlatList
        data={BLEList}
        renderItem={({ item }) => {
          return (
            <DeviceListItem item={item} />
          )
        }}
        keyExtractor={item => item.id.toString()}
        ListEmptyComponent={DataActivityIndicator}
      />

      <TouchableHighlight onPress={logout} style={styles.logoutButton} underlayColor='#DDDDDD'>
        <View>
          <Text style={{ color: 'black', fontWeight: 'bold' }}>
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
    backgroundColor: '#F5FDFF',
    flex: 1
  },
  borderView: {
    margin: 30,
    alignSelf: 'center',
    bottom: 0,
    width: '80%',
    height: 2,
    backgroundColor: '#DDD'
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
    justifyContent: 'center',
    backgroundColor: 'white',
    borderColor: '#4DA6A6',
    borderRadius: 5,
    borderWidth: 1,
    height: 28,
    width: 130
  },
  rowTitleText: {
    color: 'black',
    fontWeight: 'bold',
    alignSelf: 'center',
    fontSize: 25,
    margin: 15
  },
  rowFrontText: {
    color: 'black',
    fontWeight: 'bold'
  },
  rowContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    flexDirection: 'row'
  },
  logoutButton: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: 'white',
    borderColor: '#4DA6A6',
    borderRadius: 5,
    borderWidth: 1,
    height: 28,
    width: 130
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
