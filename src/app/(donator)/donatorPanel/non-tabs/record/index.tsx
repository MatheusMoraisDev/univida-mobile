import { FlatList } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import {
  HospitalCard,
  HospitalName,
  DistanceInfo,
  HospitalAddress,
} from "@/src/styles/screens/donator/scheduleDonationStyles";
import {
  AddressRow,
  AppointmentDetailsContainer,
  DateTimeRow,
  DonatesListContainer,
  LabelValue,
  LocationRow,
  Value,
} from "@/src/styles/screens/donator/recordStyles";
import {
  appointmentService,
  IAppointmentPaginatedResponse,
  IAppointment,
  Appointment, // Certifique-se de que este tipo está definido corretamente
} from "@/src/services/appointmentsService";
import { UserContext } from "@/src/contexts/userContext";
import Toast from "react-native-toast-message";
import { Container } from "@/src/components/atoms/container";
import { ActivityIndicator } from "react-native-paper";
import CustomText from "@/src/components/atoms/text";

export default function RecordAppointments() {
  const donatorId = useContext(UserContext).userData?.user?.referenceId;

  const [appointments, setAppointments] =
    useState<IAppointmentPaginatedResponse | null>(null);

  // Definir explicitamente os tipos de estado para os agendamentos abertos e fechados
  const [openAppointments, setOpenAppointments] = useState<Appointment[]>([]);
  const [closedAppointments, setClosedAppointments] = useState<Appointment[]>(
    [],
  );

  const [loading, setLoading] = useState(true);

  const fetchDonates = async () => {
    try {
      setLoading(true);
      const response = await appointmentService.getAppointments({ donatorId });
      setAppointments(response);

      // Separando agendamentos em aberto e fechados
      const today = new Date();
      const open: IAppointment[] = [];
      const closed: IAppointment[] = [];
      response.items.forEach((appointment) => {
        const scheduledDate = new Date(appointment.scheduledDate);
        if (scheduledDate >= today) {
          open.push(appointment);
        } else {
          closed.push(appointment);
        }
      });

      setOpenAppointments(open);
      setClosedAppointments(closed);
    } catch {
      Toast.show({
        type: "error",
        text1: "Erro ao buscar agendamentos.",
        text2: "Entre em contato com a administração.",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDonates();
  }, []);

  if (loading) {
    return (
      <Container justify="center" align="center">
        <ActivityIndicator animating={true} />
        <CustomText>Carregando hospitais...</CustomText>
      </Container>
    );
  }

  return (
    <Container>
      <DonatesListContainer>
        {openAppointments.length > 0 && (
          <>
            <CustomText>Em aberto</CustomText>
            <FlatList
              data={openAppointments}
              keyExtractor={(item) => item.id.toString()}
              style={{ marginTop: 20 }}
              renderItem={({ item }) => (
                <HospitalCard>
                  <AppointmentDetailsContainer>
                    <DateTimeRow>
                      <Value>
                        <LabelValue>Data: </LabelValue>
                        {item.scheduledDate
                          ? item.scheduledDate.split("-").reverse().join("/")
                          : ""}
                      </Value>
                      <Value>
                        <LabelValue>Horário: </LabelValue>
                        {item.scheduledTime}
                      </Value>
                    </DateTimeRow>

                    <LocationRow>
                      <Value>
                        <LabelValue>Local: </LabelValue>
                        {item.hospital.name}
                      </Value>
                    </LocationRow>

                    <AddressRow>
                      <Value>
                        <LabelValue>Endereço:</LabelValue>
                        {item.hospital.addresses[0].street},{" "}
                        {item.hospital.addresses[0].neighborhood},{" "}
                        {item.hospital.addresses[0].city} -{" "}
                        {item.hospital.addresses[0].state},{" "}
                        {item.hospital.addresses[0].zip}
                      </Value>
                    </AddressRow>
                  </AppointmentDetailsContainer>
                </HospitalCard>
              )}
            />
          </>
        )}
        {closedAppointments.length > 0 && (
          <>
            <CustomText>Histórico</CustomText>
            <FlatList
              data={closedAppointments}
              keyExtractor={(item) => item.id.toString()}
              style={{ marginTop: 20 }}
              renderItem={({ item }) => (
                <HospitalCard>
                  <AppointmentDetailsContainer>
                    <DateTimeRow>
                      <Value>
                        <LabelValue>Data: </LabelValue>
                        {item.scheduledDate
                          ? item.scheduledDate.split("-").reverse().join("/")
                          : ""}
                      </Value>
                      <Value>
                        <LabelValue>Horário: </LabelValue>
                        {item.scheduledTime}
                      </Value>
                    </DateTimeRow>

                    <LocationRow>
                      <Value>
                        <LabelValue>Local: </LabelValue>
                        {item.hospital.name}
                      </Value>
                    </LocationRow>

                    <AddressRow>
                      <Value>
                        <LabelValue>Endereço:</LabelValue>
                        {item.hospital.addresses[0].street},{" "}
                        {item.hospital.addresses[0].neighborhood},{" "}
                        {item.hospital.addresses[0].city} -{" "}
                        {item.hospital.addresses[0].state},{" "}
                        {item.hospital.addresses[0].zip}
                      </Value>
                    </AddressRow>
                  </AppointmentDetailsContainer>
                </HospitalCard>
              )}
            />
          </>
        )}
      </DonatesListContainer>
    </Container>
  );
}
