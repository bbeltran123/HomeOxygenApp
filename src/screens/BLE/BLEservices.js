import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { SafeAreaView, View, FlatList, StyleSheet, Text, TouchableHighlight } from 'react-native'
import { selectedService, disconnectDevice } from './../../actions'
import DataActivityIndicator from './../../components/DataActivityIndicator'

const ServiceItem = ({ service }) => {
  return (
    <View style={styles.item}>
      <Text style={styles.title}>{service.uuid}</Text>
      <Text style={styles.subtext}>Primary: {service.isPrimary.toString()}</Text>
    </View>
  )
}

const BLEservices = (props) => {
  const { connectedDeviceServices, connectedDevice } = useSelector(state => state.BLEs)
  const dispatch = useDispatch()

  const onServiceSelected = (service) => {
    dispatch(selectedService(service))
    props.navigation.navigate('BLECharacteristics')
  }

  const handleDisconnect = () => {
    dispatch(disconnectDevice(connectedDevice))
    props.navigation.navigate('BLEDevices')
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={connectedDeviceServices}
        renderItem={({ item }) =>
          <TouchableHighlight
            onPress={() => onServiceSelected(item)}
            style={styles.rowFront}
            underlayColor='#AAA'
          >
            <ServiceItem service={item} />
          </TouchableHighlight>}
        keyExtractor={item => item.id.toString()}
        ListEmptyComponent={DataActivityIndicator}
      />
      <TouchableHighlight
        onPress={handleDisconnect}
        style={styles.rowFront}
        underlayColor='#AAA'
      >
        <View style={styles.item}>
          <Text
            style={{ color: 'white', fontWeight: 'bold' }}
          >
                    Tap to disconnect
          </Text>
        </View>
      </TouchableHighlight>
    </SafeAreaView>
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
    color: 'white',
    fontSize: 14
  },
  subtext: {
    color: 'white',
    fontSize: 10
  }
})

export default BLEservices
