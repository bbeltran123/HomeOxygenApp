import React from 'react'
import { useSelector } from 'react-redux'
import { View, StyleSheet, Text, Button } from 'react-native'

export const CharacteristicItem = ({ characteristic }) => {
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
  )
}

const enableNotificationsClicked = (readCharacteristic) => {
  readCharacteristic.monitor((error, characteristic) => {
    if (error) {
      console.log(error)
    }
    if (characteristic !== null) {
      console.log(characteristic.uuid)
    }
  })
}

const BLEReadcharacteristic = () => {
  const { selectedCharacteristic } = useSelector(state => state.BLEs)

  return (
    <>
      <Text>{selectedCharacteristic.uuid}</Text>
      <CharacteristicItem characteristic={selectedCharacteristic} />
      <Button title='Enable Notifications' onPress={() => enableNotificationsClicked(selectedCharacteristic)} />
    </>
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
    fontSize: 14
  },
  subtext: {
    fontSize: 10
  }
})

export default BLEReadcharacteristic
