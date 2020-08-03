import React from 'react'
import { connect, useSelector} from 'react-redux'
import Base64 from '../../utils/Base64';
import { SafeAreaView, View, FlatList, StyleSheet, Text, TouchableHighlight, Button } from 'react-native'
import { selectedService, disconnectDevice, writeCharacteristic, changeHeartRate } from './../../actions'
import DataActivityIndicator from './../../components/DataActivityIndicator'

function O2Data({ data }) {
return (
  <View style={styles.item}>
    <Text style={styles.title}>{data}</Text>
  </View>
  )
}

function Item ({ service }) {
  return (
    <View style={styles.item}>
      <Text style={styles.title}>{service.uuid}</Text>
      <Text style={styles.subtext}>Primary: {service.isPrimary.toString()}</Text>
    </View>
  )
}

function base64ToHex(str) {
  const raw = Base64.atob(str);
  let result = '';
  for (let i = 0; i < raw.length; i++) {
    const hex = raw.charCodeAt(i).toString(16);
    result += (hex.length === 2 ? hex : '0' + hex);
  }
  return result.toUpperCase();
}

function handleClick (heartRate, BLERead, BLEServices) {
  var dataArr = []
  console.log("Hello there")
  BLERead.monitor((error, characteristic) => {
  if (error) {
    console.log("ERROR!!")
    console.log(error);
  }
  if (characteristic !== null) {
    dataArr.push(characteristic.value)
    console.log('printing characteristic value', characteristic.value)
  }    
  console.log("Characteristic written back!")
  console.log(base64ToHex(dataArr[0]))
  var hexString = base64ToHex(dataArr[0])
  var HR = (parseInt(hexString.charAt(16), 10)*16) + parseInt((hexString.charAt[17], 10))
  console.log("Heart Rate", HR)
  console.log("before state Heart Rate", heartRate)
  BLEServices.changeHeartRate(HR)
  console.log("after state Heart Rate", heartRate)
  // console.log(Base64.atob(message))
  })
  BLEServices.writeCharacteristic("text")
}

function handleDisconnect (device, disconnectAction, navigation) {
  disconnectAction(device)
  navigation.navigate('BLEDevices')
}

function BLEservices (BLEServices) {
  const BLEReadCharacteristic = useSelector(state => state.BLEs.readCharacteristic)
  const BLEWriteCharacteristic = useSelector(state => state.BLEs.writeCharacteristic)
  const heartRate  = useSelector(state => state.BLEs.heartRate)

  return (
    <SafeAreaView style={styles.container}>
      <Button
        title='read O2 Ring'
            onPress={() => handleClick(heartRate, BLEReadCharacteristic, BLEServices)}
      />
      <O2Data data={heartRate}/>

      <TouchableHighlight
        onPress={() =>
          handleDisconnect(BLEServices.connectedDevice, BLEServices.disconnectDevice, BLEServices.navigation)}
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
// }

function mapStateToProps (state) {
  return {
    connectedDeviceServices: state.BLEs.connectedDeviceServices,
    connectedDevice: state.BLEs.connectedDevice
  }
}

const mapDispatchToProps = dispatch => ({
  selectedService: service => dispatch(selectedService(service)),
  disconnectDevice: device => dispatch(disconnectDevice(device)),
  writeCharacteristic: text => dispatch(writeCharacteristic(text)),
  changeHeartRate: heartRate => dispatch(changeHeartRate(heartRate))
})

export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(BLEservices)

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
