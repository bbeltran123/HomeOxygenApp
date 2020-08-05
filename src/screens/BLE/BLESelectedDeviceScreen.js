import React from 'react'
import { connect, useSelector} from 'react-redux'
import Base64 from '../../utils/Base64';
import { 
  SafeAreaView, 
  View, 
  FlatList, 
  StyleSheet, 
  Text, 
  TouchableHighlight, 
  Button 
} from 'react-native'
import { 
  selectedService, 
  disconnectDevice, 
  writeCharacteristic, 
  changeHeartRate, 
  changeSPO2 
} from './../../actions'

import DataActivityIndicator from './../../components/DataActivityIndicator'

const HeartRateData = (data) => {
return (
  <View style={styles.item}>
    <Text style={styles.title}>Heart Rate: {data - 8}</Text>
  </View>
  )
}

const SPO2Data = (data) => {
return (
  <View style={styles.item}>
    <Text style={styles.title}>SPO2: {data+4}</Text>
  </View>
  )
}

const Item = (service) => {
  return (
    <View style={styles.item}>
      <Text style={styles.title}>{service.uuid}</Text>
        //
      <Text style={styles.subtext}>Primary: {service.isPrimary.toString()}</Text>
    </View>
  )
}

const base64ToHex = (str) => {
  const raw = Base64.atob(str);
  let result = '';
  for (let i = 0; i < raw.length; i++) {
    const hex = raw.charCodeAt(i).toString(16);
    result += (hex.length === 2 ? hex : '0' + hex);
  }
  return result.toUpperCase();
}

const handleClick = (heartRate, BLERead, BLEServices) => {
  var dataArr = []
  BLERead.monitor((error, characteristic) => {
    console.log("notifications enabled")
  if (error) {
    console.log("error")
    console.log(error);
  }
  if (characteristic !== null) {
    console.log("characteristic written back")
    console.log("\n\n\n")
    dataArr.push(characteristic.value)
  }    
  console.log(dataArr.length)
  var hexString = base64ToHex(dataArr[0])
  console.log(hexString)
  var SPO2 = (parseInt(hexString.charAt(14), 10)*16) + parseInt((hexString.charAt[15], 10))
  var HR = (parseInt(hexString.charAt(16), 10)*16) + parseInt((hexString.charAt[17], 10))
  BLEServices.changeSPO2(SPO2)
  BLEServices.changeHeartRate(HR)
  })
  BLEServices.writeCharacteristic()
}

const handleDisconnect = (device, disconnectAction, navigation) => {
  disconnectAction(device)
  navigation.navigate('BLEDevices')
}

const BLESelectedDeviceScreen = (BLEServices) => {
  const BLEReadCharacteristic = useSelector(state => state.BLEs.readCharacteristic)
  const BLEWriteCharacteristic = useSelector(state => state.BLEs.writeCharacteristic)
  const heartRate = useSelector(state => state.BLEs.heartRate)
  const SPO2 = useSelector(state => state.BLEs.SPO2)

  return (
    <SafeAreaView style={styles.container}>
      <Button
        title='read O2 Ring'
            onPress={() => handleClick(heartRate, BLEReadCharacteristic, BLEServices)}
      />
      <HeartRateData data={ heartRate}/>
      <SPO2Data data={SPO2}/>

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

function mapStateToProps (state) {
  return {
    connectedDeviceServices: state.BLEs.connectedDeviceServices,
    connectedDevice: state.BLEs.connectedDevice,
    heartRate: state.BLEs.heartRate,
    SPO2: state.BLEs.SPO2
  }
}

const mapDispatchToProps = dispatch => ({
  selectedService: service => dispatch(selectedService(service)),
  disconnectDevice: device => dispatch(disconnectDevice(device)),
  writeCharacteristic: text => dispatch(writeCharacteristic(text)),
  changeHeartRate: heartRate => dispatch(changeHeartRate(heartRate)),
  changeSPO2: SPO2 => dispatch(changeSPO2(SPO2))
})

export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(BLESelectedDeviceScreen)

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