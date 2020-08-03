import React from 'react'
import { connect } from 'react-redux'
import { SafeAreaView, View, FlatList, StyleSheet, Text, TouchableHighlight } from 'react-native'
import { selectedService, disconnectDevice } from './../../actions'
import DataActivityIndicator from './../../components/DataActivityIndicator'

function Item ({ service }) {
  return (
    <View style={styles.item}>
      <Text style={styles.title}>{service.uuid}</Text>
      <Text style={styles.subtext}>Primary: {service.isPrimary.toString()}</Text>
    </View>
  )
}

function handleClick (BLEServices, serviceId) {
  BLEServices.selectedService(serviceId)
  BLEServices.navigation.navigate('BLECharacteristics')
}

function handleDisconnect (device, disconnectAction, navigation) {
  disconnectAction(device)
  navigation.navigate('BLEDevices')
}

function BLEservices (BLEServices) {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={BLEServices.connectedDeviceServices}
        renderItem={({ item }) =>
          <TouchableHighlight
            onPress={() => handleClick(BLEServices, item)}
            style={styles.rowFront}
            underlayColor='#AAA'
          >
            <Item service={item} />
          </TouchableHighlight>}
        keyExtractor={item => item.id.toString()}
        ListEmptyComponent={DataActivityIndicator}
      />
      <TouchableHighlight
        onPress={() =>
          handleDisconnect(BLEServices.connectedDevice, BLEServices.disconnectDevice, BLEServices.navigation)}
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
// }

function mapStateToProps (state) {
  return {
    connectedDeviceServices: state.BLEs.connectedDeviceServices,
    connectedDevice: state.BLEs.connectedDevice
  }
}

const mapDispatchToProps = dispatch => ({
  selectedService: service => dispatch(selectedService(service)),
  disconnectDevice: device => dispatch(disconnectDevice(device))
})

export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(BLEservices)

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