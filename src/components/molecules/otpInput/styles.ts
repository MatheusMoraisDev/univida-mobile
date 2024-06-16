import styled from "styled-components/native";

interface OtpInputContainerProps {
  mt?: number;
}

export const OtpInputContainer = styled.View<OtpInputContainerProps>`
  width: 100%;
  height: ${({ theme }) => theme.metrics.px(50)}px;
  flex-direction: row;
  justify-content: center;
  gap: ${({ theme }) => theme.metrics.px(10)}px;
  align-items: center;
  margin-top: ${({ theme, mt }) => theme.metrics.px(mt || 20)}px;
`;

export const OtpInputStyle = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${({ theme }) => theme.metrics.px(50)}px;
  height: ${({ theme }) => theme.metrics.px(50)}px;
  border-width: ${({ theme }) => theme.metrics.px(1)}px;
  border-color: ${({ theme }) => theme.colors.black};
  border-radius: ${({ theme }) => theme.metrics.px(8)}px;
  font-size: ${({ theme }) => theme.metrics.px(20)}px;
  text-align: center;
`;
