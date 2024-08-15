import { View, Text } from "react-native";
import React, { useContext } from "react";
import { UserContext } from "@/src/contexts/userContext";

const hospitalHome = () => {
  const { state } = useContext(UserContext);

  return (
    <View
      style={{
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text>Home Hospital</Text>
      <Text>{state.isAuthenticated}</Text>
      <Text>{state.user?.email}</Text>
      <Text>{state.user?.firstName}</Text>
      <Text>{state.user?.id}</Text>
    </View>
  );
};

export default hospitalHome;
