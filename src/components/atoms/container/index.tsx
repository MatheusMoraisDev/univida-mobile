import { theme } from "@/src/styles";
import styled from "styled-components/native";

interface IContainer {
  dir?: string;
  justify?: string;
  align?: string;
  width?: string;
  height?: string;
  ml?: number;
  mt?: number;
  pd?: number;
}

export const Container = styled.View<IContainer>`
  display: flex;
  flex-direction: ${({ dir }) => dir || "column"};
  justify-content: ${({ justify }) => justify || "center"};
  align-items: ${({ align }) => align || "flex-start"};
  background-color: white;
  width: ${({ width }) => width || '100%'};
  height: ${({ height }) => height || '100%'};
  margin-left: ${({ ml, theme }) => theme.metrics.px(ml) || '0'}px;
  margin-top: ${({ mt, theme }) => theme.metrics.px(mt) || '0'}px;
  padding: ${({ pd, theme }) => pd !== undefined ? theme.metrics.px(pd) : theme.metrics.px(20)}px;`