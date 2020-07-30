import React, {useState} from 'react';
import Base64 from './Base64';
import { connect } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaView, View, FlatList, StyleSheet, Text , TextInput,Button} from 'react-native';
import { modifyHeartRate} from './actions';
import DataActivityIndicator from './DataActivityIndicator';

function Item({ characteristic }) {
    return (
      <View style={styles.item}>
        <Text style={styles.title}>{characteristic.uuid}</Text>
        <Text style={styles.subtext}>Notifiable: {characteristic.isNotifiable.toString()}</Text>
        <Text style={styles.subtext}>Notifying: {characteristic.isNotifying.toString()}</Text>
        <Text style={styles.subtext}>Readable: {characteristic.isReadable.toString()}</Text>
        <Text style={styles.subtext}>Indicatable: {characteristic.isIndicatable.toString()}</Text>
        <Text style={styles.subtext}>Writeable with Response: {characteristic.isWritableWithResponse.toString()}</Text>
        <Text style={styles.subtext}>Writeable without Response: {characteristic.isWritableWithoutResponse.toString()}</Text>
        
      </View>
    );
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

function handleClick (reduxStore, heartRate){
  var dataArr = []
  console.log("Hello there")
  var message = ""
  reduxStore.selectedCharacteristic.monitor((error, characteristic) => {
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

function BLEReadcharacteristic(ReduxStore) {

  const [text,setText] = useState({'text':''});

    return(
        <>
          <Text>{ReduxStore.selectedCharacteristic.uuid}</Text>
          <Item characteristic={ReduxStore.selectedCharacteristic} />
          <Button
            title="Enable Notifications"
            onPress={() => handleClick(ReduxStore, ReduxStore.heartRate)}
          />
          </>
  );
}
//}

function mapStateToProps(state){
  return{
    selectedCharacteristic: state.BLEs.selectedCharacteristic,
    heartRate: state.BLEs.heartRate, 
  };
}

const mapDispatchToProps = dispatch => ({
  modifyHeartRate: text => dispatch(modifyHeartRate(heartRate))
})

export default connect(mapStateToProps,mapDispatchToProps,null,{ forwardRef: true })(BLEReadcharacteristic);

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: 2,
    },
    item: {
      backgroundColor: '#4DA6A6',
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
    },
    title: {
      fontSize: 14,
    },
    subtext: {
        fontSize: 10,
      }
  });