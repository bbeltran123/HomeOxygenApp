import React from 'react'
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View
} from 'react-native'

const DataActivityIndicator = () => {
  return (
    <View style={[styles.container]}>
      <View style={[styles.horizontal]}>
        <ActivityIndicator size='large' color='#4DA6A6' />
        <Text>Searching...</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  horizontal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  }
})

export default DataActivityIndicator
