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
import { connect, useSelector, useDispatch } from 'react-redux'
import { connectDevice, startScan } from '../../actions'
import DataActivityIndicator from '../../components/DataActivityIndicator'


function HeartRate({ HR }) {
return (
  <View style={styles.item}>
    <Text style={styles.title}>{HR}</Text>
  </View>
  )
}

const handleClick = (readChar, writeChar) => {
	console.log(props)
	var dataArr = []
	console.log("Hello there")
	var message = ""
	readChar.monitor((error, characteristic) => {
	if (error) {
	  console.log(error);
	}
	if (characteristic !== null) {
	  dataArr.push(characteristic.value)
	  console.log('printing characteristic value', characteristic.value)
	  message = message + characteristic.value
	}    
	console.log("Characteristic written back!")
	console.log(base64ToHex(dataArr[0]))
	var hexString = base64ToHex(dataArr[0])
	var HR = (parseInt(hexString.charAt(16), 10)*16) + parseInt((hexString.charAt[17], 10))
	console.log("Heart Rate", HR)
	console.log("state Heart Rate", heartRate)
	reduxStore.modifyHeartRate(HR)
	// console.log(Base64.atob(message))
	})

}


function BLESelectedDeviceScreen() {
	const BLEReadCharacteristic = useSelector(state => state.BLEs.readCharacteristic)
	const BLEWriteCharacteristic = useSelector(state => state.BLEs.writeCharacteristic)
	const heartRate  = useSelector(state => state.BLEs.heartRate)

	return (
		<>
		<Button
			title='read O2 Ring'
	        onPress={() => handleClick(BLEReadCharacteristic, BLEWriteCharacteristic)}
		/>
		<HeartRate HR={heartRate}/>
		</>
	)
}



function mapStateToProps (state) {
  return {
    BLEReadCharacteristic: state.BLEs.readCharacteristic,
	BLEWriteCharacteristic: state.BLEs.writeCharacteristic,
	heartRate: state.BLEs.heartRate
  }
}

const mapDispatchToProps = dispatch => ({

})

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
    fontSize: 14
  },
  subtext: {
    fontSize: 10
  }
})

export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(BLESelectedDeviceScreen)