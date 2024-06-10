import styled from "styled-components/native";

interface InputContainerProps {
  mt?: number;
}

export const InputContainer = styled.View<InputContainerProps>`
  align-items: flex-start;
  justify-content: flex-start;
  width: ${({ theme }) => theme.metrics.px(280)}px;
  height: ${({ theme }) => theme.metrics.px(40)}px;
  border-bottom-width: ${({ theme }) => theme.metrics.px(2)}px;
  border-bottom-color: ${({ theme }) => theme.colors.primary};
  padding: 0;
  margin-top: ${({ theme, mt }) => theme.metrics.px(mt) || theme.metrics.px(20)}px;
`;

export const TextInput = styled.TextInput.attrs(({ theme }) => ({
  placeholderTextColor: theme.colors.black,
  selectionColor: theme.colors.black,
}))`
  font-size: ${({ theme }) => theme.metrics.px(16)}px;
  font-family: ${({ theme }) => theme.fonts.Inter_400Regular};
  color: ${({ theme }) => theme.colors.black};
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
`;
