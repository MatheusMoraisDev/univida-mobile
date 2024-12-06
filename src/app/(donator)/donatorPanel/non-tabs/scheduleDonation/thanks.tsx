import React, { useEffect, useState } from "react";
import { Animated } from "react-native";
import { useRouter } from "expo-router";
import Button from "@/src/components/atoms/button";
import { theme } from "@/src/styles";
import {
  Container,
  Icon,
  ModalContainer,
  Subtitle,
  Title,
} from "@/src/styles/screens/thanksStyles";

export default function ThankYouScreen() {
  const [fadeAnim] = useState(new Animated.Value(0));
  const router = useRouter();

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleGoBack = () => {
    router.push("donatorPanel");
  };

  return (
    <Container style={{ opacity: fadeAnim }}>
      <ModalContainer>
        <Icon icon="check-circle" size={70} iconColor={theme.colors.green} />
        <Title>Agendamento realizado com sucesso!</Title>
        <Subtitle>
          Sua generosidade faz a diferença! {"\n\n"} Agradecemos profundamente
          sua contribuição e apoio à nossa causa.
        </Subtitle>

        <Button title="Voltar para a página inicial" onPress={handleGoBack} />
      </ModalContainer>
    </Container>
  );
}
