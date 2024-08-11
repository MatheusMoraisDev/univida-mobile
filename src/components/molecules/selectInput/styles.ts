import Styled from "styled-components/native";

const ListItemContainer = Styled.View`
  padding: ${({ theme }) => theme.metrics.px(15)}px;
  border-bottom-width: ${({ theme }) => theme.metrics.px(0.5)}px;
  border-bottom-color: rgba(0, 0, 0, 0.2);
`;

export default ListItemContainer;
