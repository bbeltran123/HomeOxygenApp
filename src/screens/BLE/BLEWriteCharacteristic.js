import React, { useState } from 'react'
import { connect, useDispatch } from 'react-redux'
import { View, StyleSheet, Text, TextInput, Button } from 'react-native'
import { writeCharacteristic } from '../../actions'
import { CharacteristicItem } from './BLEReadCharacteristic'


function BLEWritecharacteristic () {
  const { selectedCharacteristic } = useSelector(state => state.BLEs)
  const dispatch = useDispatch()
  
  const [text, setText] = useState('')

  return (
    <>
      <Text>{selectedCharacteristic.uuid}</Text>
      <CharacteristicItem characteristic={selectedCharacteristic} />
      <TextInput
        onChangeText={(text) => setText(text)}
        style={{ height: 40, color: 'black', borderColor: 'gray', borderWidth: 1 }}
        value={text}
      />
      <Button
        title='Write'
        onPress={() => dispatch(writeCharacteristic(text + '\n'))}
      />
    </>
  )
}

export default BLEWritecharacteristic

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
    fontSize: 14,
    color: 'white'
  },
  subtext: {
    fontSize: 10,
    color: 'white'
  }
})
