import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Container, Header} from 'native-base';

export default class Home extends Component{
  render(){
	  return (
      	<Container>
	    		<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
	      		<Text>Home!</Text>
	    	</View>
	    </Container>
  		);  	
	}
}