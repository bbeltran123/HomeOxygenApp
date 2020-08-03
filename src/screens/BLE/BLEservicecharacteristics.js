import React from 'react'
import { connect } from 'react-redux'
import { SafeAreaView, View, FlatList, StyleSheet, Text, TouchableHighlight } from 'react-native'
import { selectedCharacteristic, getServiceCharacteristics } from '../../actions'
import DataActivityIndicator from '../../components/DataActivityIndicator'

function Item ({ characteristic }) {
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

function handleClick (BLECharacteristic, characteristic) {
  // console.log("handleclick:", BLECharacteristic);
  // console.log(ReduxStore)
  BLECharacteristic.selectCharacteristic(characteristic)
  BLECharacteristic.navigation.navigate('BLECharacteristic')
}

function BLEservicecharacteristics (BLECharacteristics) {
  // console.log("function:", BLECharacteristics);
  BLECharacteristics.getServiceCharacteristics(BLECharacteristics.BLEService)
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={BLECharacteristics.BLEServiceCharacteristics}
        renderItem={({ item }) =>
          <TouchableHighlight
            onPress={() => handleClick(BLECharacteristics, item)}
            style={styles.rowFront}
            underlayColor='#AAA'
          >
            <Item characteristic={item} />
          </TouchableHighlight>}
        keyExtractor={item => item.id.toString()}
        ListEmptyComponent={DataActivityIndicator}
      />
    </SafeAreaView>
  )
}
// }

function mapStateToProps (state) {
  return {
    BLEService: state.BLEs.selectedService,
    BLEServiceCharacteristics: state.BLEs.connectedServiceCharacteristics
  }
}

const mapDispatchToProps = dispatch => ({
  selectCharacteristic: characteristic => dispatch(selectedCharacteristic(characteristic)),
  getServiceCharacteristics: service => dispatch(getServiceCharacteristics(service))
})

export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(BLEservicecharacteristics)

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