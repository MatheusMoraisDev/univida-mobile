import { Text, View } from "react-native";
import React, { Component } from "react";

export default class address extends Component {
  render() {
    return (
      <View
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text>Endereço do hospital</Text>
      </View>
    );
  }
}
