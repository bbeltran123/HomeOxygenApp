import React, {useState} from 'react';
import { connect } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaView, View, FlatList, StyleSheet, Text , TextInput,Button} from 'react-native';
import { writeCharacteristic} from './actions';
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

function listener(error, characteristic) {
  console.log(characteristic)
  return;
}

function handleClick (characteristic){
  console.log("Hello there")
  characteristic.monitor(listener())
}

function BLEReadcharacteristic(ReduxStore) {

  const [text,setText] = useState({'text':''});

    return(
        <>
          <Text>{ReduxStore.selectedCharacteristic.uuid}</Text>
          <Item characteristic={ReduxStore.selectedCharacteristic} />
          <Button
            title="Enable Notifications"
            onPress={() => handleClick(ReduxStore.selectedCharacteristic)}
          />
          </>
  );
}
//}

function mapStateToProps(state){
  return{
    selectedCharacteristic: state.BLEs.selectedCharacteristic,
  };
}

const mapDispatchToProps = dispatch => ({
  writeCharacteristic: text => dispatch(writeCharacteristic(text))
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