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
import BLE from './BLE'
import { connect, useSelector, useDispatch } from 'react-redux'
import { connectDevice, connectDeviceCompletely, startScan } from '../../actions'
import DataActivityIndicator from '../../components/DataActivityIndicator'
import { AuthContext } from '../../AuthProvider'

const BLEList = (props) => {
  useEffect(() => {
    props.startScan()
  })

  const handleClick = (device) => {
    props.connectDeviceCompletely(device)
    props.navigation.navigate('BLEServices')
  }

  const {logout} = useContext(AuthContext)

  const BLEList = useSelector(state => state.BLEs.BLEList)

  return (
    <Container>
      <FlatList
        data={BLEList}
        renderItem={({ item }) =>
          <>
            <TouchableHighlight
              onPress={() => handleClick(item)}
              style={styles.rowFront}
              underlayColor='#DDDDDD'
            >
              <View>
                <Text
                  style={{ color: 'white', fontWeight: 'bold' }}
                >
                            Tap to connect to: {item.name}
                </Text>
              </View>
            </TouchableHighlight>
          </>}
        keyExtractor={item => item.id.toString()}
        ListEmptyComponent={DataActivityIndicator}
      />

      <TouchableHighlight
        onPress={logout}
        style={styles.rowFront}
        underlayColor='#DDDDDD'
      >
        <View>
          <Text
            style={{ color: 'white', fontWeight: 'bold' }}
          >
                            Logout
          </Text>
        </View>
      </TouchableHighlight>

      <Footer>
        <BLE />
      </Footer>
    </Container>
  )
}

function mapStateToProps (state) {
  return {
    BLEList: state.BLEs.BLEList
  }
}

const mapDispatchToProps = dispatch => ({
  connectDevice: device => dispatch(connectDevice(device)),
  connectDeviceCompletely: device => dispatch(connectDeviceCompletely(device)),
  startScan: () => dispatch(startScan())
})

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

export default connect(mapStateToProps, mapDispatchToProps)(BLEList)
