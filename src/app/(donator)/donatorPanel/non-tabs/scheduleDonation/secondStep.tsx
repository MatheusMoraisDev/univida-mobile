import CustomText from "@/src/components/atoms/text";
import { CalendarPicker } from "@/src/components/organisms/CalendarPicker";
import { useState, useEffect } from "react";
import { DateData } from "react-native-calendars";
import { View, FlatList, Animated } from "react-native";
import {
  HeaderTextContainer,
  StyledSchedulerContainer,
  TimeButton,
  TimeButtonText,
} from "@/src/styles/screens/scheduleDonationStyles";
import Button from "@/src/components/atoms/button";
import { useLocalSearchParams } from "expo-router";
import { appointmentService } from "@/src/services/appointmentsService";

export default function SelectDateAndTime() {
  const [day, setDay] = useState<DateData | null>(null);
  const [showTimeOptions, setShowTimeOptions] = useState(false);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [fadeAnim] = useState(new Animated.Value(0));
  const [showButtonAnim] = useState(new Animated.Value(0));
  const { hospitalId } = useLocalSearchParams<{ hospitalId: string }>();

  const handleDateSelect = (selectedDay: DateData) => {
    setDay(selectedDay);
    setShowTimeOptions(true);
  };

  const timeOptions = ["08:00", "08:30", "09:00", "09:30", "10:00"];

  useEffect(() => {
    if (showTimeOptions) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
  }, [showTimeOptions]);

  useEffect(() => {
    if (selectedTime) {
      Animated.timing(showButtonAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
  }, [selectedTime]);

  const handleConfirm = () => {
    try {
      appointmentService.createAppointment({
        hospitalId,
        donatorId: "1",
        date: day?.dateString,
        time: selectedTime,
      });
    } catch {
      // handle error
    }
  };

  return (
    <StyledSchedulerContainer>
      <HeaderTextContainer>
        <CustomText color="white" size={14} font="semiBold">
          Agende sua doação abaixo.
        </CustomText>
        <CustomText color="white" size={12} font="regular">
          Selecione a data e o horário.
        </CustomText>
      </HeaderTextContainer>

      <CalendarPicker day={day} setDay={handleDateSelect} />

      {showTimeOptions && (
        <Animated.View style={{ opacity: fadeAnim }}>
          <View style={{ marginTop: 20 }}>
            <FlatList
              horizontal
              data={timeOptions}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => (
                <TimeButton
                  onPress={() => setSelectedTime(item)}
                  selected={item === selectedTime}
                >
                  <TimeButtonText selected={item === selectedTime}>
                    {item}
                  </TimeButtonText>
                </TimeButton>
              )}
              keyExtractor={(item) => item}
            />
          </View>
        </Animated.View>
      )}

      {selectedTime && (
        <Animated.View style={{ opacity: showButtonAnim, marginTop: 100 }}>
          <Button title="Confirmar" onPress={handleConfirm} bottomButton />
        </Animated.View>
      )}
    </StyledSchedulerContainer>
  );
}
