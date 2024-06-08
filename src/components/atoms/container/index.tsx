import styled from "styled-components/native";

interface IContainer {
  dir?: string;
  justify?: string;
  align?: string;
}

export const Container = styled.View<IContainer>`
  display: flex;
  flex-direction: ${({ dir }) => dir || "column"};
  justify-content: ${({ justify }) => justify || "center"};
  align-items: ${({ align }) => align || "flex-start"};
  background-color: white;
  width: 100%;
  height: 100%;
`;