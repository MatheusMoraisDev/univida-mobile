import { theme } from "@/src/styles";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import { TouchableOpacity } from "react-native";

export default function DonatorScheduleDonationLayout() {
  const router = useRouter();

  return (
    <Stack
      screenOptions={{
        headerTitleStyle: {
          fontFamily: theme.fonts.Inter_600SemiBold,
          fontSize: theme.metrics.px(16),
        },
        headerTitleAlign: "center",
        headerShadowVisible: false,
        headerLeft: () => (
          <TouchableOpacity onPress={() => router.push("donatorPanel")}>
            <MaterialCommunityIcons
              name="arrow-left"
              size={theme.metrics.px(34)}
              color={theme.colors.darkGray}
            />
          </TouchableOpacity>
        ),
      }}
    >
      <Stack.Screen
        name="firstStep"
        options={{
          title: "Agendar doação",
        }}
      />
      <Stack.Screen
        name="secondStep"
        options={{
          title: "Agendar doação",
        }}
      />
    </Stack>
  );
}
