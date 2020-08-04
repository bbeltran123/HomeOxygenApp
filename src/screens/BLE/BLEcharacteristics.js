import React from 'react'
import { useSelector } from 'react-redux'
import BLEReadCharacteristic from './BLEReadCharacteristic'
import BLEWriteCharacteristic from './BLEWriteCharacteristic'

const BLEcharacteristic = (ReduxStore) => {
  const selectedCharacteristic = useSelector(state => state.BLEs.selectedCharacteristic)
  if (selectedCharacteristic.isNotifiable) {
    return (<BLEReadCharacteristic />)
  } else if (selectedCharacteristic.isWritableWithResponse || selectedCharacteristic.isWritableWithoutResponse) {
    return (<BLEWriteCharacteristic />)
  }
}

export default BLEcharacteristic
