import { View } from "react-native"
import { Container } from "../../atoms"
import { Button } from "../../atoms/button"
import { Logo } from "../../atoms/logo"
import CustomText from "../../atoms/text"
import { CustomTextInput } from "../../atoms/textInput"
import { Link } from "expo-router"
import { FirstAccessStyles } from "./styles"

export const LoginForm = () => {
  return (
    <Container align="center">
      <Logo size="medium" />
      <CustomTextInput placeholder="Digite o seu e-mail" mt={50} />
      <CustomTextInput placeholder="Digite sua senha" mt={20} secure />
      <Button title="Entrar" mt={60} />
      <FirstAccessStyles>
        <CustomText size={14}>Primeiro acesso?</CustomText>
        <CustomText size={14} color="primary"><Link href={"/register"}> Acesse aqui</Link></CustomText>
      </FirstAccessStyles>
    </Container>
  )
}