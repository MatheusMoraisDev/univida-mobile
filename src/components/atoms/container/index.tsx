import styled from "styled-components/native";

interface IContainer {
  dir?: string;
  justify?: string;
  align?: string;
  width?: string;
  height?: string;
}

export const Container = styled.View<IContainer>`
  display: flex;
  flex-direction: ${({ dir }) => dir || "column"};
  justify-content: ${({ justify }) => justify || "center"};
  align-items: ${({ align }) => align || "flex-start"};
  background-color: white;
  width: ${({ width }) => width || '100%'};
  height: ${({ height }) => height || '100%'};
`;