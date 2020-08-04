import React from 'react'
import { Text, View } from 'react-native'
import { Container } from 'native-base'

const Home = () => {
  return (
    <Container>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Home!</Text>
      </View>
    </Container>
  )
}

export default Home
