import CustomText from "@/src/components/atoms/text";
import { Container } from "@/src/components/atoms/container";
import GridMenu from "@/src/components/organisms/gridMenu";
import { useContext } from "react";
import { UserContext } from "@/src/contexts/userContext";

const options = [
  {
    title: "Lista de doadores",
    icon: "calendar",
    link: "hospitalPanel/non-tabs/listDonation/firstStep",
  },
  {
    title: "Abrir solicitação",
    icon: "plus",
    link: "hospitalPanel/non-tabs/record",
  },
  {
    title: "Adicione conteúdo",
    icon: "content-save",
    link: "hospitalPanel/non-tabs/content/firstStep",
  },
  {
    title: "Encontrar doadores",
    icon: "account-search",
    link: "hospitalPanel/non-tabs/findDonators/firstStep",
  },
];

const hospitalHome = () => {
  const { userData } = useContext(UserContext);

  return (
    <Container justify="center" pd={10} align="center">
      <CustomText size={26} mt={40} font="regular">
        {userData.user.firstName}
      </CustomText>
      <CustomText size={16} mt={5} font="regular">
        Escolha um item para começar
      </CustomText>
      <GridMenu options={options} />
    </Container>
  );
};

export default hospitalHome;
