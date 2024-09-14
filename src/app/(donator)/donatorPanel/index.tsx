import CustomText from "@/src/components/atoms/text";
import { Container } from "@/src/components/atoms/container";
import GridMenu from "@/src/components/organisms/gridMenu";
import { useContext } from "react";
import { UserContext } from "@/src/contexts/userContext";

const options = [
  {
    title: "Agendar doação",
    icon: "calendar",
    link: "donatorPanel/non-tabs/scheduleDonation",
  },
  {
    title: "Registro",
    icon: "file-document",
    link: "donatorPanel/non-tabs/record",
  },
  {
    title: "Conteúdo",
    icon: "content-save",
    link: "donatorPanel/non-tabs/content",
  },
  {
    title: "Encontrar doadores",
    icon: "account-search",
    link: "donatorPanel/non-tabs/findDonators",
  },
];

const donatorHome = () => {
  const { userData } = useContext(UserContext);

  return (
    <Container justify="center" pd={10} align="center">
      <CustomText size={26} mt={40} font="regular">
        {`Bem vindo, ${userData.user.firstName}!`}
      </CustomText>
      <CustomText size={16} mt={5} font="regular">
        Escolha um item para começar
      </CustomText>
      <GridMenu options={options} />
    </Container>
  );
};

export default donatorHome;
