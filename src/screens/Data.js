import React from 'react'
import { Text, View } from 'react-native'
import { Container, Header } from 'native-base'

const Data = () => {
  return (
    <Container>
      <Header />
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Data Center!</Text>
      </View>
    </Container>
  )
}

export default Data
