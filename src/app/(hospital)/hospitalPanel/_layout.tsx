import BellNotification from "@/src/components/organisms/bellNotification";
import { theme } from "@/src/styles";
import MaterialCommunityIcons from "@expo/vector-icons/build/MaterialCommunityIcons";
import { Tabs } from "expo-router";
import { View } from "react-native";

export default function DonatorPanelLayout() {
  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <View
        style={{
          position: "absolute",
          top: 10,
          right: 10,
          zIndex: 1,
        }}
      >
        <BellNotification />
      </View>

      <Tabs
        screenOptions={{
          tabBarStyle: {
            backgroundColor: theme.colors.primary,
            borderTopColor: theme.colors.white,
            borderBottomColor: theme.colors.white,
            paddingBottom: 5,
            height: 60,
            paddingHorizontal: 10,
            marginHorizontal: 10,
            marginVertical: 10,
            borderTopWidth: 0,
            borderRadius: 20,
          },
          tabBarActiveTintColor: theme.colors.white,
          tabBarInactiveTintColor: theme.colors.lightGray,
          tabBarLabelStyle: {
            fontSize: theme.metrics.px(10),
            fontFamily: theme.fonts.Inter_800ExtraBold,
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            headerShown: false,
            title: "Início",
            tabBarIcon: ({ color, size, focused }) => (
              <View style={{ alignItems: "center" }}>
                <MaterialCommunityIcons
                  name="home"
                  size={focused ? size + 6 : size}
                  color={color}
                />
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="user"
          options={{
            headerShown: false,
            title: "Usuário",
            tabBarIcon: ({ color, size, focused }) => (
              <View style={{ alignItems: "center" }}>
                <MaterialCommunityIcons
                  name="account"
                  size={focused ? size + 6 : size}
                  color={color}
                />
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="calendar"
          options={{
            headerShown: false,
            title: "Calendário",
            tabBarIcon: ({ color, size, focused }) => (
              <View style={{ alignItems: "center" }}>
                <MaterialCommunityIcons
                  name="calendar"
                  size={focused ? size + 6 : size}
                  color={color}
                />
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            headerShown: false,
            title: "Configurações",
            tabBarIcon: ({ color, size, focused }) => (
              <View style={{ alignItems: "center" }}>
                <MaterialCommunityIcons
                  name="cog"
                  size={focused ? size + 6 : size}
                  color={color}
                />
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="non-tabs"
          options={{
            headerShown: false,
            href: null,
          }}
        />
      </Tabs>
    </View>
  );
}
