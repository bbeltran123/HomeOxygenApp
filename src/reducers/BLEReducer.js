import update from 'immutability-helper'

const INITIAL_STATE = {
  BLEList: [],
  connectedDevice: {},
  connectedDeviceServices: [],
  connectedServiceCharacteristics: [],
  selectedService: {},
  selectedCharacteristic: {},
  readCharacteristic: {},
  writeCharacteristic: {},
  heartRate: 8,
  SPO2: -4,
  status: 'disconnected'
}

const BLEReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'ADD_BLE':
      if (state.BLEList.some(device => device.id === action.device.id) || !action.device.isConnectable || action.device.name === null) {
        return state
      } else {
        return update(state, {
          BLEList: {
            $set: [
              ...state.BLEList,
              action.device
            ]
          }
        })
      }
    case 'CONNECTED_DEVICE':
      return update(state, { connectedDevice: { $set: action.connectedDevice } })
    case 'CONNECTED_SERVICES':
      return update(state, { connectedDeviceServices: { $set: action.connectedDeviceServices } })
    case 'SELECTED_SERVICE':
      return update(state, { selectedService: { $set: action.selectedService } })
    case 'SELECTED_CHARACTERISTIC':
      return update(state, { selectedCharacteristic: { $set: action.selectedCharacteristic } })
    case 'CONNECTED_CHARACTERISTICS':
      return update(state, { connectedServiceCharacteristics: { $set: action.connectedServiceCharacteristics } })
    case 'CHANGE_STATUS':
      return update(state, { status: { $set: action.status } })
    case 'CHANGE_HEARTRATE':
      return update(state, { heartRate: { $set: action.heartRate } })
    case 'CHANGE_SPO2':
      return update(state, { SPO2: { $set: action.SPO2 } })      
    case 'CHANGE_READCHARACTERISTIC':
      return update(state, { readCharacteristic: { $set: action.readCharacteristic } })
    case 'CHANGE_WRITECHARACTERISTIC':
      return update(state, { writeCharacteristic: { $set: action.writeCharacteristic } })      
    default:
      return state
  }
}

export default BLEReducer
