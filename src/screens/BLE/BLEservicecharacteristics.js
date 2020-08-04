import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { SafeAreaView, FlatList, StyleSheet, TouchableHighlight } from 'react-native'
import { selectedCharacteristic, getServiceCharacteristics } from '../../actions'
import DataActivityIndicator from '../../components/DataActivityIndicator'
import { CharacteristicItem } from './BLEReadCharacteristic'

const BLEservicecharacteristics = (props) => {
  const { BLEService, BLEServiceCharacteristics } = useSelector(state => state.BLEs)
  const dispatch = useDispatch()

  dispatch(getServiceCharacteristics(BLEService))
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={BLEServiceCharacteristics}
        renderItem={({ item }) =>
          <TouchableHighlight
            onPress={() => {
              dispatch(selectedCharacteristic(item))
              props.navigation.navigate('BLECharacteristic')
            }}
            style={styles.rowFront}
            underlayColor='#AAA'
          >
            <CharacteristicItem characteristic={item} />
          </TouchableHighlight>}
        keyExtractor={item => item.id.toString()}
        ListEmptyComponent={DataActivityIndicator}
      />
    </SafeAreaView>
  )
}

export default BLEservicecharacteristics

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
