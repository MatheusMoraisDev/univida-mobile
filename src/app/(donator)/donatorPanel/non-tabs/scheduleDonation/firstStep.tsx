import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";
import { Text, ActivityIndicator } from "react-native-paper";
import { Container } from "@/src/components/atoms/container";
import { hospitalService } from "@/src/services/hospitalService";
import Toast from "react-native-toast-message";
import * as Location from "expo-location";
import { IHospitalAddresses } from "@/src/interfaces/hospital.interface";
import {
  DistanceInfo,
  HeaderTextContainer,
  HospitalAddress,
  HospitalCard,
  HospitalListContainer,
  HospitalName,
} from "@/src/styles/screens/scheduleDonationStyles";
import CustomText from "@/src/components/atoms/text";
import { router } from "expo-router";

export default function SelectHospital() {
  const [location, setLocation] = useState<{
    lat: number;
    lgt: number;
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const [hospitals, setHospitals] = useState<IHospitalAddresses[]>([]);

  const getLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Toast.show({
        type: "error",
        text1: "Permissão negada.",
        text2: "Entre em contato com a administração.",
      });
      return;
    }

    const userLocation = await Location.getCurrentPositionAsync({});
    setLocation({
      lat: userLocation.coords.latitude,
      lgt: userLocation.coords.longitude,
    });
  };

  const fetchNearbyHospitals = async () => {
    if (!location) return;
    try {
      setLoading(true);
      const hospitalsResponse = await hospitalService.getNerbys(
        location.lat,
        location.lgt,
      );
      setHospitals(hospitalsResponse);
    } catch {
      Toast.show({
        type: "error",
        text1: "Erro ao buscar hospitais.",
        text2: "Entre em contato com a administração.",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  useEffect(() => {
    if (location) {
      fetchNearbyHospitals();
    }
  }, [location]);

  const handleHospitalSelect = (hospitalData: object) => {
    router.push({
      pathname: "donatorPanel/non-tabs/scheduleDonation/secondStep",
      params: { hospital: JSON.stringify(hospitalData) },
    });
  };

  if (loading) {
    return (
      <Container justify="center" align="center">
        <ActivityIndicator animating={true} />
        <Text>Carregando hospitais...</Text>
      </Container>
    );
  }

  return (
    <Container justify="center" align="center">
      <HeaderTextContainer>
        <CustomText color="white" size={14} font="semiBold">
          Hospitais exibidos conforme sua localização
        </CustomText>
        <CustomText color="white" size={12} font="regular">
          Selecione um hospital abaixo para doar.
        </CustomText>
      </HeaderTextContainer>
      <HospitalListContainer>
        <FlatList
          data={hospitals}
          keyExtractor={(item) => item.cnpj}
          renderItem={({ item }) => (
            <HospitalCard onPress={() => handleHospitalSelect(item)}>
              <HospitalName>{item.name}</HospitalName>
              <DistanceInfo>{`${item.distance.toFixed(2)}Km`}</DistanceInfo>
              <HospitalAddress>
                {item.addresses[0].street}, {item.addresses[0].neighborhood},{" "}
                {item.addresses[0].city} - {item.addresses[0].state},{" "}
                {item.addresses[0].zip}
              </HospitalAddress>
            </HospitalCard>
          )}
        />
      </HospitalListContainer>
    </Container>
  );
}
