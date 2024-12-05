import React, { useState, useEffect, useContext } from "react";
import { Animated, View, FlatList } from "react-native";
import CustomText from "@/src/components/atoms/text";
import { CalendarPicker } from "@/src/components/organisms/CalendarPicker";
import {
  HeaderTextContainer,
  StyledSchedulerContainer,
  TimeButton,
  TimeButtonText,
} from "@/src/styles/screens/scheduleDonationStyles";
import Button from "@/src/components/atoms/button";
import { appointmentService } from "@/src/services/appointmentsService";
import { useLocalSearchParams } from "expo-router";
import { UserContext } from "@/src/contexts/userContext";
import Modal from "@/src/components/atoms/modal";
import Toast from "react-native-toast-message";
import { useRouter } from "expo-router";
import { DateData } from "react-native-calendars";

export default function SelectDateAndTime() {
  const [day, setDay] = useState<DateData | null>(null);
  const [showTimeOptions, setShowTimeOptions] = useState(false);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [fadeAnim] = useState(new Animated.Value(0));
  const [showButtonAnim] = useState(new Animated.Value(0));
  const [confirmationVisible, setConfirmationVisible] = useState(false);
  const hospitalData = JSON.parse(useLocalSearchParams().hospital);
  const { userData } = useContext(UserContext);
  const router = useRouter();

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

  const handleConfirm = async () => {
    if (!day || !selectedTime) return;

    setConfirmationVisible(false);
    try {
      await appointmentService.createAppointment({
        hospitalId: hospitalData.id,
        donatorId: userData.user.referenceId,
        scheduledDate: day?.dateString,
        scheduledTime: selectedTime,
      });

      // Redireciona para a tela de agradecimento após agendamento bem-sucedido
      router.push("/donatorPanel/non-tabs/scheduleDonation/thanks");
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: "Erro ao agendar doação.",
        text2: error.message,
      });
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
          <Button
            title="Confirmar"
            onPress={() => setConfirmationVisible(true)}
            bottomButton
          />
        </Animated.View>
      )}

      <Modal
        visible={confirmationVisible}
        onClose={() => setConfirmationVisible(false)}
        onConfirm={handleConfirm}
      >
        <CustomText>Confirmar Agendamento</CustomText>
        <CustomText>
          Você deseja confirmar o agendamento para o dia {day?.dateString} às{" "}
          {selectedTime} no hospital {hospitalData.name}?
        </CustomText>
      </Modal>
    </StyledSchedulerContainer>
  );
}
