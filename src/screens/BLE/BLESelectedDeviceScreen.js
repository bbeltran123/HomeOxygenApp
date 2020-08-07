import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Base64 from '../../utils/Base64'
import {
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  TouchableHighlight,
  Button
} from 'react-native'
import {
  disconnectDevice,
  writeCharacteristic,
  changeHeartRate,
  changeSPO2
} from './../../actions'

const O2RingData = ({ dataType, data }) => {
  return (
    <View style={styles.item}>
      <Text style={styles.title}>{dataType}: {data}</Text>
    </View>
  )
}

const base64ToHex = (str) => {
  const raw = Base64.atob(str)
  let result = ''
  for (let i = 0; i < raw.length; i++) {
    const hex = raw.charCodeAt(i).toString(16)
    result += (hex.length === 2 ? hex : '0' + hex)
  }
  return result.toUpperCase()
}

const BLESelectedDeviceScreen = (props) => {
  const { connectedDevice, heartRate, SPO2 } = useSelector(state => state.BLEs)
  const dispatch = useDispatch()

  const handleReadRing = () => {
    var dataArr = []
    props.BLEReadCharacteristic.monitor((error, characteristic) => {
      console.log('notifications enabled')
      if (error) {
        console.log('error')
        console.log(error)
      }
      if (characteristic !== null) {
        console.log('characteristic written back')
        console.log('\n\n\n')
        dataArr.push(characteristic.value)
      }
      console.log(dataArr.length)
      var hexString = base64ToHex(dataArr[0])
      console.log(hexString)
      var SPO2 = (parseInt(hexString.charAt(14), 10) * 16) + parseInt((hexString.charAt[15], 10))
      var HR = (parseInt(hexString.charAt(16), 10) * 16) + parseInt((hexString.charAt[17], 10))
      dispatch(changeSPO2(SPO2))
      dispatch(changeHeartRate(HR))
    })
    dispatch(writeCharacteristic())
  }

  return (
    <SafeAreaView style={styles.container}>
      <Button
        title='read O2 Ring'
        onPress={() => handleReadRing()}
      />
      <O2RingData
        dataType='Heart Rate'
        data={heartRate}
      />
      <O2RingData
        dataType='SPO2'
        data={SPO2}
      />

      <TouchableHighlight
        onPress={() => {
          dispatch(disconnectDevice(connectedDevice))
          props.navigation.navigate('BLEDevices')
        }}
        style={styles.rowFront}
        underlayColor='#AAA'
      >
        <View style={styles.item}>
          <Text
            style={{ color: 'white', fontWeight: 'bold' }}
          >
                    Tap to disconnect
          </Text>
        </View>
      </TouchableHighlight>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 2
  },
  item: {
    backgroundColor: '#4DA6A6',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16
  },
  title: {
    color: 'white',
    fontSize: 14
  },
  subtext: {
    color: 'white',
    fontSize: 10
  }
})

export default BLESelectedDeviceScreen
