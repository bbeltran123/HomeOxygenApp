import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Text, TextInput, Button } from 'react-native'
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
