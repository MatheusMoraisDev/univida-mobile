import { View, Text } from "react-native";
import React, { useContext } from "react";
import { UserContext } from "@/src/contexts/userContext";

const hospitalHome = () => {
  const { userData } = useContext(UserContext);

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
      <Text>{userData.isAuthenticated}</Text>
      <Text>{userData.user?.email}</Text>
      <Text>{userData.user?.firstName}</Text>
      <Text>{userData.user?.id}</Text>
    </View>
  );
};

export default hospitalHome;
