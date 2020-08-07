import React from 'react'
import { View, Text, TouchableHighlight, StyleSheet } from 'react-native'

const DeviceListItem = (device, connectToDevice) => {
  return (
    <View style={styles.container}>
      <TouchableHighlight onPress={connectToDevice} style={styles.rowFront} underlayColor='#DDDDDD'>
        <View>
          <Text style={{ color: 'white', fontWeight: 'bold' }}>
         Tap to connect to: {device.name}
          </Text>
        </View>
      </TouchableHighlight>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 235,
    width: '100%'
  },
  standaloneRowFront: {
    alignItems: 'center',
    backgroundColor: '#CCC',
    justifyContent: 'center',
    height: 50
  }
})

export default DeviceListItem
