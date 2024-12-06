import React, { useState } from "react";
import CustomText from "@/src/components/atoms/text";
import { CalendarPicker } from "@/src/components/organisms/CalendarPicker";
import { DateData } from "react-native-calendars";
import {
  HeaderTextContainer,
  StyledSelectDateContainer,
} from "@/src/styles/screens/hospital/listDonationsStyles";
import { Animated } from "react-native";
import Button from "@/src/components/atoms/button";
import { useRouter } from "expo-router";

export default function SelectDate() {
  const [day, setDay] = useState<DateData | null>(null);
  const [showButtonAnim] = useState(new Animated.Value(0));
  const router = useRouter();

  const handleDateSelect = (selectedDay: DateData) => {
    setDay(selectedDay);

    Animated.timing(showButtonAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const handleNextStep = async () => {
    if (!day) return;

    router.push({
      pathname: "/hospitalPanel/non-tabs/listDonation/secondStep",
      params: { date: day.dateString },
    });
  };

  return (
    <StyledSelectDateContainer>
      <HeaderTextContainer>
        <CustomText color="white" size={14} font="semiBold">
          Selecione uma data abaixo.
        </CustomText>
        <CustomText color="white" size={12} font="regular">
          Selecione a data que deseja consultar
        </CustomText>
      </HeaderTextContainer>

      <CalendarPicker day={day} setDay={handleDateSelect} />

      {day?.dateString && (
        <Animated.View style={{ opacity: showButtonAnim, marginTop: 200 }}>
          <Button title="Avançar" onPress={handleNextStep} bottomButton />
        </Animated.View>
      )}
    </StyledSelectDateContainer>
  );
}
