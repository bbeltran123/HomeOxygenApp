import React, { Component } from 'react';
import { Text, View } from 'react-native';

export default class Data extends Component{
  render(){
	  return (
	    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
	      <Text>Data Center!</Text>
	    </View>
  		);  	
	}
}