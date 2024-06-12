import { Text, View } from 'react-native'
import React, { Component } from 'react'

export default class donatorData extends Component {
  render() {
    return (
      <View style={{'flex': 1, 'display':'flex', 'alignItems':'center', 'justifyContent':'center'}}>
        <Text>Dados do doador</Text>
      </View>
    )
  }
}