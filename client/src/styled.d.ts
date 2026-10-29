import "styled-components";
import { SectionTheme } from "./types";

declare module "styled-components" {
  export interface DefaultTheme extends SectionTheme {}
}
