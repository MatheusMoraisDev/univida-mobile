import { Text, View } from 'react-native'
import React, { Component } from 'react'

export default class teste extends Component {
  render() {
    return (
      <View style={{'flex': 1, 'display':'flex', 'alignItems':'center', 'justifyContent':'center'}}>
        <Text>Cadastro</Text>
      </View>
    )
  }
}