import React from 'react'
import { StyleSheet, TouchableOpacity, Text } from 'react-native'

const FormButton = ({ buttonTitle, ...rest }) => {
  return (
    <TouchableOpacity style={styles.buttonContainer} {...rest}>
      <Text style={styles.buttonText}>{buttonTitle}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 10,
    width: 230,
    height: 51,
    backgroundColor: '#4DA6A6',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 18
  },
  buttonText: {
    // fontFamily: 'Roboto',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff'
  }
})

export default FormButton
