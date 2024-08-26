import CustomText from "@/src/components/atoms/text";
// import { UserContext } from "@/src/contexts/userContext";
import { Container } from "@/src/components/atoms/container";
import GridMenu from "@/src/components/molecules/gridMenu";

const options = [
  {
    title: "Agendar doação",
    icon: "calendar",
    link: "donatorPanel",
  },
  {
    title: "Registro",
    icon: "file-document",
    link: "donatorPanel",
  },
  {
    title: "Conteúdo",
    icon: "content-save",
    link: "donatorPanel",
  },
  {
    title: "Encontrar doadores",
    icon: "account-search",
    link: "donatorPanel",
  },
];

const donatorHome = () => {
  // const { userData } = useContext(UserContext);

  return (
    <Container justify="flex-start" pd={10} align="center">
      <CustomText size={24} mt={60} font="regular">
        Bem vindo, Matheus!
      </CustomText>
      <CustomText size={16} mt={5} font="regular">
        Quero escrever algo aqui
      </CustomText>
      <GridMenu options={options} />
    </Container>
  );
};

export default donatorHome;
