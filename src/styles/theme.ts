import { colors } from "./colors";
import { fonts } from "./fonts";
import { metrics } from "./metrics";
import { DefaultTheme } from "styled-components";

interface ITheme {
  colors: typeof colors;
  fonts: typeof fonts;
  metrics: typeof metrics;
}

declare module "styled-components" {
  interface DefaultTheme extends ITheme {}
}

export const theme: DefaultTheme = {
  colors,
  fonts,
  metrics,
};
