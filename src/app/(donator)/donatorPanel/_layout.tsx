import { theme } from "@/src/styles";
import MaterialCommunityIcons from "@expo/vector-icons/build/MaterialCommunityIcons";
import { Tabs } from "expo-router";
import { View } from "react-native";

export default function DonatorPanelLayout() {
  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <Tabs
        screenOptions={{
          tabBarStyle: {
            backgroundColor: theme.colors.primary,
            borderTopColor: theme.colors.white,
            borderBottomColor: theme.colors.white,
            paddingBottom: 5,
            height: 60,
            paddingHorizontal: 20,
            marginHorizontal: 10,
            marginVertical: 10,
            borderTopWidth: 0,
            borderRadius: 20,
          },
          tabBarActiveTintColor: theme.colors.white,
          tabBarInactiveTintColor: theme.colors.white,
        }}
      >
        <Tabs.Screen
          name="user"
          options={{
            headerShown: false,
            title: "Usuário",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="account"
                size={size}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="index"
          options={{
            headerShown: false,
            title: "Home",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="home" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="calendar"
          options={{
            headerShown: false,
            title: "Calendário",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="calendar"
                size={size}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            headerShown: false,
            title: "Configurações",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="cog" size={size} color={color} />
            ),
          }}
        />
      </Tabs>
    </View>
  );
}
