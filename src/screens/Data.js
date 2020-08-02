import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { Container, Header } from 'native-base'

export default class Data extends Component {
  render () {
    return (
      <Container>
        <Header />
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Data Center!</Text>
        </View>
      </Container>
    )
  }
}
