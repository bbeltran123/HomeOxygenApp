
import React from 'react'
import { StyleSheet, TextInput } from 'react-native'

export default function FormInput ({ labelValue, placeholderText, ...rest }) {
  return (
    <TextInput
      value={labelValue}
      style={styles.input}
      numberOfLines={1}
      placeholder={placeholderText}
      placeholderTextColor='#666'
      {...rest}
    />
  )
}

const styles = StyleSheet.create({
  input: {
    padding: 10,
    marginTop: 5,
    marginBottom: 10,
    width: 300,
    height: 50,
    fontSize: 16,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ADA7A7'
  }
})
